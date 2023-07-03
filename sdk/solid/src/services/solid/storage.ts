import { Session } from "@inrupt/solid-client-authn-browser";
import { getThing } from "./thing";
import { createUrl, removeHashFromUrl } from "../../helper/urlHelper";
import { getProperty } from "./property";
import { WS } from "@inrupt/vocab-solid";

interface IGetStorageFromWebId {
  webId: URL;
  session?: Session;
}

export const getStorageFromWebId = async ({
  webId,
  session,
}: IGetStorageFromWebId): Promise<string> => {
  const thing = await getThing({
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
