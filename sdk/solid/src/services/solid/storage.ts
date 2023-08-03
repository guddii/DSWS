import { Session as SessionBrowser } from "@inrupt/solid-client-authn-browser";
import { Session as SessionNode } from "@inrupt/solid-client-authn-node";
import { legacyGetThing } from "./thing";
import { createUrl, removeHashFromUrl } from "../../helper/urlHelper";
import { getProperty } from "./property";
import { WS } from "@inrupt/vocab-solid";

interface IGetStorageFromWebId {
  webId: URL;
  session?: SessionBrowser | SessionNode;
}

export const getStorageFromWebId = async ({
  webId,
  session,
}: IGetStorageFromWebId): Promise<string> => {
  const thing = await legacyGetThing({
    datasetUrl: removeHashFromUrl(webId),
    thingUrl: webId,
    session,
  });

  const storage = await getProperty({
    thing,
    predicate: createUrl(WS.storage),
  });

  return storage.firstProperty;
};
