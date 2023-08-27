import {
  UrlString,
  WebId,
  getSolidDataset,
  getThing,
  getUrl,
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-node";
import { WS } from "@inrupt/vocab-solid";

/**
 * Retrieves the main storage pod for the provided webId.
 * @param session logged in solid session
 * @param webId webId to get the corresponding storage pod
 * @returns url to storage pod or null
 */
export const getPodFromWebId = async (
  session: Session,
  webId: WebId
): Promise<UrlString | null> => {
  const dataset = await getSolidDataset(webId, { fetch: session.fetch });
  const thing = getThing(dataset, webId);

  if (!thing) {
    return null;
  }

  return getUrl(thing, WS.storage);
};
