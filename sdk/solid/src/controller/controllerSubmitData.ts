import { Session } from "@inrupt/solid-client-authn-node";
import {
  createUrl,
  removeHashFromUrl,
  replaceHashInUrl,
} from "../helper/urlHelper";
import { legacyGetThing } from "../services/solid/thing";
import { getProperty } from "../services/solid/property";
import {
  buildThing,
  createResource,
  createThing,
  FOAF,
  getResourceFromResponse,
  getSolidDataset,
  saveSolidDatasetAt,
  setThing,
  turtleFileGenerator,
  universalAccess,
  WS,
} from "../index";
import { NextResponse } from "next/server";

const getMainPod = async (session: Session) => {
  const { webId } = session.info;
  const datasetUrl = webId ? removeHashFromUrl(webId) : undefined;
  const thingUrl = webId ? createUrl(webId) : undefined;

  const thing = await legacyGetThing({ session, datasetUrl, thingUrl });
  const data = await getProperty({ thing, predicate: createUrl(WS.storage) });
  return data.firstProperty;
};

const createNewPod = async (session: Session) => {
  const response = await session.fetch("https://provision.inrupt.com/", {
    method: "POST",
  });
  const body = await response.json();

  if (!body.storage) {
    throw new Error("Pod creation failed.");
  }

  return String(body.storage);
};

const getPodList = async (session: Session, storage: string) => {
  const url: URL = createUrl("pods.ttl", storage);
  try {
    const dataset = await getSolidDataset(url.toString(), {
      fetch: session.fetch,
    });

    return dataset;
  } catch (error: any) {
    if (error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

const createPodList = async (session: Session, storage: string) => {
  const url: URL = createUrl("pods.ttl", storage);

  const response = await createResource({
    url,
    body: turtleFileGenerator(),
    session,
  });
  return getResourceFromResponse(response);
};

const getUserPod = async (session: Session, storage: string, webId: string) => {
  const datasetUrl = createUrl("pods.ttl", storage);
  const thingUrl = replaceHashInUrl(datasetUrl, `#${webId}`);

  try {
    const thing = await legacyGetThing({ session, datasetUrl, thingUrl });
    const data = await getProperty({
      thing,
      predicate: createUrl(FOAF.page.iri.value),
    });
    return data.firstProperty;
  } catch (error: any) {
    if (error.message.includes("did not resolve")) {
      return null;
    }
    throw error;
  }
};

const addUserPodToList = async (
  session: Session,
  storage: string,
  webId: string,
  userPod: string
) => {
  const resourceURL = createUrl("pods.ttl", storage);
  let podListDataset = await getSolidDataset(resourceURL.toString(), {
    fetch: session.fetch,
  });

  const userPodThing = buildThing(createThing({ name: webId }))
    .addUrl(FOAF.page.iri.value, userPod)
    .build();

  podListDataset = setThing(podListDataset, userPodThing);

  return await saveSolidDatasetAt(
    resourceURL.toString(),
    podListDataset,
    { fetch: session.fetch } // fetch from authenticated Session
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
}

export const controllerSubmitData = async ({
  request,
  session,
}: IControllerSubmitData) => {
  if (session.info.isLoggedIn) {
    const searchParams = new URL(request.url).searchParams;
    const webId = searchParams.get("webId");

    if (webId) {
      const mainPod = await getMainPod(session);
      const podList = await getPodList(session, mainPod);

      if (!podList) {
        await createPodList(session, mainPod);
      }

      let userPod = await getUserPod(session, mainPod, webId);

      if (!userPod) {
        userPod = await createNewPod(session);
        await addUserPodToList(session, mainPod, webId, userPod);
      }

      const submittedData = await request.json();
      const submittedDataUrl = await createTurtleData(
        session,
        userPod,
        webId,
        submittedData
      );

      await universalAccess.setAgentAccess(
        submittedDataUrl,
        webId,
        { read: true, write: false, controlRead: true, controlWrite: true },
        { fetch: session.fetch }
      );

      return NextResponse.json({ url: submittedDataUrl }, { status: 200 });
    }
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
