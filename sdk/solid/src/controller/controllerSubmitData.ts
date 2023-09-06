import { Session } from "@inrupt/solid-client-authn-node";
import { createUrl } from "../helper/urlHelper";
import {
  createResource,
  FOAF,
  turtleFileGenerator,
  universalAccess,
} from "../index";
import { NextResponse } from "next/server";
import { getPodFromWebId } from "../helper/getPodFromWebId";
import {
  submitDataGetDataset,
  submitDataCreateDataset,
  getValueFromDataset,
  addValueToDataset,
  createNewPod,
} from "../services/submitData/dataHelper";
import {
  IAdditionalUniqueData,
  createAndAddUniqueData,
} from "../services/submitData/uniqueData";

const getPodList = (session: Session, storage: string) => {
  return submitDataGetDataset(session, storage, "pods.ttl");
};

const createPodList = (session: Session, storage: string) => {
  return submitDataCreateDataset(session, storage, "pods.ttl");
};

const getUserPod = async (session: Session, storage: string, webId: string) => {
  return getValueFromDataset(
    session,
    storage,
    "pods.ttl",
    webId,
    FOAF.page.iri.value,
    "url"
  );
};

const addUserPodToList = async (
  session: Session,
  storage: string,
  webId: string,
  userPod: string
) => {
  return addValueToDataset(
    session,
    storage,
    "pods.ttl",
    webId,
    FOAF.page.iri.value,
    userPod,
    "url"
  );
};

const createTurtleData = async (
  session: Session,
  storage: string,
  webId: string,
  values: Record<string, string>
) => {
  const url: URL = createUrl(`submission-${Date.now()}.ttl`, storage);

  const response = await createResource({
    url,
    body: turtleFileGenerator({ subject: webId, values }),
    session,
  });

  return response.url;
};

interface IControllerSubmitData {
  request: Request;
  session: Session;
  additionalData?: Record<string, string>;
  additionalUniqueData?: Array<IAdditionalUniqueData>;
}

export const controllerSubmitData = async ({
  request,
  session,
  additionalData = {},
  additionalUniqueData = [],
}: IControllerSubmitData) => {
  if (session.info.isLoggedIn) {
    if (!session.info.webId) {
      return NextResponse.json(
        { error: "Could not retrieve agent pod" },
        { status: 500 }
      );
    }

    const searchParams = new URL(request.url).searchParams;
    const webId = searchParams.get("webId");
    if (!webId) {
      return NextResponse.json(
        { error: "Required webId url is missing as request parameter" },
        { status: 400 }
      );
    }

    const agentPod = await getPodFromWebId(session, session.info.webId);
    if (!agentPod) {
      return NextResponse.json(
        { error: "Could not retrieve agent pod" },
        { status: 500 }
      );
    }

    try {
      const podList = await getPodList(session, agentPod);
      if (!podList) {
        await createPodList(session, agentPod);
      }

      let userPod = await getUserPod(session, agentPod, webId);
      if (!userPod) {
        userPod = await createNewPod(session);
        await addUserPodToList(session, agentPod, webId, userPod);
      }

      const uniqueData = await createAndAddUniqueData(
        session,
        agentPod,
        webId,
        additionalUniqueData
      );

      const submittedData = await request.json();
      const submittedDataUrl = await createTurtleData(session, userPod, webId, {
        ...submittedData,
        ...additionalData,
        ...uniqueData,
      });

      await universalAccess.setAgentAccess(
        submittedDataUrl,
        webId,
        { read: true },
        { fetch: session.fetch }
      );

      return NextResponse.json(
        { url: submittedDataUrl, data: uniqueData },
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
