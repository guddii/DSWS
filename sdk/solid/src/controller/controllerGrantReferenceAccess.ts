import {
  AccessModes,
  UrlString,
  WebId,
  buildThing,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  saveSolidDatasetAt,
  setThing,
  universalAccess,
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-node";
import { NextResponse } from "next/server";
import { schema } from "rdf-namespaces";
import { DCTERMS } from "@inrupt/vocab-common-rdf";

interface IGrantData {
  request: UrlString;
  granted: boolean;
}

interface IRequestFileData {
  requestor: WebId;
  owner: WebId;
  target: UrlString;
  access: Partial<AccessModes>;
  status: string;
}

const getRequestFile = async (session: Session, requestUrl: UrlString) => {
  return await getSolidDataset(requestUrl, { fetch: session.fetch });
};

const getRequestFileThing = async (session: Session, requestUrl: UrlString) => {
  const requestFile = await getRequestFile(session, requestUrl);

  const thing = getThing(requestFile, requestUrl);
  if (!thing) {
    throw new Error();
  }

  return thing;
};

const getRequestFileData = async (
  session: Session,
  requestUrl: UrlString
): Promise<IRequestFileData> => {
  const requestThing = await getRequestFileThing(session, requestUrl);

  const requestor = getUrl(requestThing, schema.agent);
  const target = getUrl(requestThing, schema.target);
  const owner = getUrl(requestThing, schema.subjectOf);
  const access = getStringNoLocale(requestThing, DCTERMS.accessRights);
  const status = getStringNoLocale(requestThing, schema.actionStatus);

  if (!requestor || !target || !owner || !access || !status) {
    throw new Error();
  }

  try {
    const parsedAccess = JSON.parse(access);

    return { requestor, target, owner, access: parsedAccess, status };
  } catch (error: any) {
    throw new Error();
  }
};

const updateRequestFileStatus = async (
  session: Session,
  requestUrl: UrlString,
  status: string
) => {
  let requestFile = await getRequestFile(session, requestUrl);

  const thing = getThing(requestFile, requestUrl);
  if (!thing) {
    throw new Error();
  }

  const updatedThing = buildThing(thing)
    .setStringNoLocale(schema.actionStatus, status)
    .build();

  requestFile = setThing(requestFile, updatedThing);

  return await saveSolidDatasetAt(requestUrl, requestFile, {
    fetch: session.fetch,
  });
};

const grantReferenceAccess = async (
  session: Session,
  requestFileData: IRequestFileData
) => {
  const grantedAccess = await universalAccess.setAgentAccess(
    requestFileData.target,
    requestFileData.requestor,
    requestFileData.access,
    { fetch: session.fetch }
  );

  if (!grantedAccess) {
    throw new Error();
  }

  return grantedAccess;
};

export interface IGrantReferenceAccessBody extends Partial<IGrantData> {}

interface IControllerGrantReferenceAccess {
  request: Request;
  session: Session;
}

export const controllerGrantReferenceAccess = async ({
  request,
  session,
}: IControllerGrantReferenceAccess) => {
  if (session.info.isLoggedIn) {
    const requestData: IGrantReferenceAccessBody = await request.json();
    if (!requestData.request) {
      return NextResponse.json(
        { error: "Required request url is missing in request body" },
        { status: 400 }
      );
    }

    try {
      try {
        await getRequestFile(session, requestData.request);
      } catch (error: any) {
        if (error.response.status === 404) {
          return NextResponse.json(
            { error: "Could not find request file" },
            { status: 404 }
          );
        } else {
          throw error;
        }
      }

      const requestFileData = await getRequestFileData(
        session,
        requestData.request
      );

      if (requestFileData.status !== "pending") {
        return NextResponse.json(
          { error: `Access request already ${requestFileData.status}` },
          { status: 400 }
        );
      }

      if (requestData.granted) {
        await grantReferenceAccess(session, requestFileData);
      }

      await updateRequestFileStatus(
        session,
        requestData.request,
        requestData.granted ? "granted" : "denied"
      );

      return NextResponse.json(
        {
          message: `Access request successfully ${
            requestData.granted ? "granted" : "denied"
          }`,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error(error);
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
