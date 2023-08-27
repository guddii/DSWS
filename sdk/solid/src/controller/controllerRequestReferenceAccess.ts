import {
  AccessModes,
  UrlString,
  WebId,
  buildThing,
  createContainerAt,
  createSolidDataset,
  createThing,
  getSolidDataset,
  getSourceUrl,
  saveSolidDatasetInContainer,
  setThing,
  universalAccess,
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-node";
import { NextResponse } from "next/server";
import { getPodFromWebId } from "../helper/getPodFromWebId";
import { createUrl, toUrlString } from "../helper/urlHelper";
import { schema } from "rdf-namespaces";
import { sendInboxMessage } from "../services/inbox";
import { MessageTypes } from "../services/inbox/InboxMessage";
import { DCTERMS } from "@inrupt/vocab-common-rdf";

interface IRequestData {
  requestor: WebId;
  owner: WebId;
  target: UrlString;
  access: Partial<AccessModes>;
}

const createRequestsFolderUrl = (storage: UrlString): UrlString => {
  return toUrlString(createUrl("requests/", storage));
};

const getRequestsFolder = async (session: Session, storage: string) => {
  const url: UrlString = createRequestsFolderUrl(storage);
  return await getSolidDataset(url, { fetch: session.fetch });
};

const createRequestsFolder = async (session: Session, storage: UrlString) => {
  const url: UrlString = createRequestsFolderUrl(storage);

  return await createContainerAt(url, { fetch: session.fetch });
};

const createRequestFileNameAndUrl = (
  storage: UrlString
): { name: string; url: UrlString } => {
  const datasetUrl: UrlString = createRequestsFolderUrl(storage);
  const name = `request-${Date.now()}.ttl`;
  const url = toUrlString(createUrl(name, datasetUrl));

  return { name, url };
};

const createRequestFile = async (
  session: Session,
  storage: UrlString,
  requestData: IRequestData
) => {
  let dataset = createSolidDataset();
  const folderUrl = createRequestsFolderUrl(storage);
  const { name, url } = createRequestFileNameAndUrl(storage);

  const newRequestThing = buildThing(createThing({ url }))
    .addUrl(schema.agent, requestData.requestor)
    .addUrl(schema.target, requestData.target)
    .addUrl(schema.subjectOf, requestData.owner)
    .addStringNoLocale(DCTERMS.accessRights, JSON.stringify(requestData.access))
    .addStringNoLocale(schema.actionStatus, "pending")
    .build();

  dataset = setThing(dataset, newRequestThing);

  return await saveSolidDatasetInContainer(folderUrl, dataset, {
    slugSuggestion: name,
    fetch: session.fetch,
  });
};

const validateRequestAccess = (
  requestedAccess: Partial<AccessModes>,
  availableAccess: AccessModes
): boolean => {
  return Object.entries(requestedAccess).every(
    ([accessMode, accessModeValue]) =>
      accessModeValue ? availableAccess[accessMode as keyof AccessModes] : true
  );
};

export interface IRequestReferenceAccessBody extends Partial<IRequestData> {}

interface IControllerRequestReferenceAccess {
  request: Request;
  session: Session;
  serviceProvider: UrlString;
}

export const controllerRequestReferenceAccess = async ({
  request,
  session,
  serviceProvider,
}: IControllerRequestReferenceAccess) => {
  if (session.info.isLoggedIn) {
    if (!session.info.webId) {
      return NextResponse.json(
        { error: "Could not retrieve agent pod" },
        { status: 500 }
      );
    }

    const requestData: IRequestReferenceAccessBody = await request.json();
    if (!requestData.requestor) {
      return NextResponse.json(
        { error: "Required requestor webId is missing in request body" },
        { status: 400 }
      );
    }
    if (!requestData.owner) {
      return NextResponse.json(
        { error: "Required owner webId is missing in request body" },
        { status: 400 }
      );
    }
    if (!requestData.target) {
      return NextResponse.json(
        { error: "Required target url is missing in request body" },
        { status: 400 }
      );
    }
    if (!requestData.access) {
      return NextResponse.json(
        { error: "Required access mode is missing in request body" },
        { status: 400 }
      );
    }

    try {
      const agentPod: UrlString | null = await getPodFromWebId(
        session,
        session.info.webId
      );
      if (!agentPod) {
        return NextResponse.json(
          { error: "Could not retrieve agent pod" },
          { status: 500 }
        );
      }

      try {
        await getRequestsFolder(session, agentPod);
      } catch (error: any) {
        if (error.response.status === 404) {
          await createRequestsFolder(session, agentPod);
        } else {
          throw error;
        }
      }

      const ownerAccess = await universalAccess.getAgentAccess(
        requestData.target,
        requestData.owner,
        { fetch: session.fetch }
      );
      if (!ownerAccess) {
        return NextResponse.json(
          { error: "Could not retrieve owner access modes" },
          { status: 500 }
        );
      }

      const validRequestAccess = validateRequestAccess(
        requestData.access,
        ownerAccess
      );
      if (!validRequestAccess) {
        return NextResponse.json(
          {
            error:
              "Owner does not have the permission to grant requested access modes",
          },
          { status: 400 }
        );
      }

      const requestFile = await createRequestFile(
        session,
        agentPod,
        requestData as IRequestData
      );
      if (!requestFile) {
        return NextResponse.json(
          { error: "Could not create request file" },
          { status: 500 }
        );
      }

      const ownerPod: UrlString | null = await getPodFromWebId(
        session,
        requestData.owner
      );
      if (!ownerPod) {
        return NextResponse.json(
          { error: "Could not retrieve owner pod" },
          { status: 500 }
        );
      }

      await sendInboxMessage({
        recipient: { webId: requestData.owner, storage: ownerPod },
        sender: { webId: session.info.webId },
        messageType: MessageTypes.REQUEST_ACCESS_MESSAGE,
        data: {
          subject: requestData.requestor,
          entries: [
            {
              type: "url",
              predicate: schema.target,
              value: requestData.target,
            },
            {
              type: "string",
              predicate: DCTERMS.accessRights,
              value: JSON.stringify(requestData.access),
            },
            {
              type: "url",
              predicate: schema.identifier,
              value: getSourceUrl(requestFile),
            },
            {
              type: "url",
              predicate: DCTERMS.mediator,
              value: toUrlString(
                createUrl("api/grantReferenceAccess", serviceProvider)
              ),
            },
          ],
        },
      });

      return NextResponse.json(
        { message: "Access request sent to inbox" },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
