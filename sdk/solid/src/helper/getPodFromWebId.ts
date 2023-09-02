import { UrlString, WebId, getPodUrlAll } from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-node";

/**
 * Retrieves the main storage pod for the provided webId.
 * @param session logged in solid session
 * @param webId webId to get the corresponding storage pod
 * @returns url to storage pod or undefined
 */
export const getPodFromWebId = async (
  session: Session,
  webId: WebId
): Promise<UrlString | undefined> => {
  return (await getPodUrlAll(webId, { fetch: session.fetch }))[0];
};
