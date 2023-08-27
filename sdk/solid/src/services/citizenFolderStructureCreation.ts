import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { AccessModes, universalAccess } from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";
import { turtleFileGenerator } from "../helper/turtleFileGenerator";
import { createUrl } from "../helper/urlHelper";
import { createContainer } from "./solid/container";
import { createResource } from "./solid/resource";
import { ValidAndVerifiedFolderStructure } from "./citizenFolderStructureVerification";
import {
  INBOX_FOLDER_NAME,
  INBOX_FOLDER_PATH,
  STAMMDATEN_FILE_NAME,
  STAMMDATEN_FOLDER_NAME,
  STAMMDATEN_FOLDER_PATH,
} from "../config";

/**
 * Creates a "stammdaten.ttl" turtle file inside of the provided storage. Fills
 * the created file with a basic data skeleton.
 * @param session running solid session
 * @param storage url of storage to create the new file in
 * @param webId user webId used as subject in created data
 * @returns response object of file creation
 */
const createStammdatenFile = async (
  session: Session,
  webId: string,
  storage: URL
): Promise<Response> => {
  const stammdatenFileUrl = createUrl(STAMMDATEN_FILE_NAME, storage);
  const defaultData = {
    subject: webId,
    values: {
      [FOAF.firstName.iri.value]: "",
      [FOAF.lastName.iri.value]: "",
    },
  };

  return await createResource({
    url: stammdatenFileUrl,
    body: turtleFileGenerator(defaultData),
    session,
  });
};

/**
 * Adds public append access to the acl configuration of the provided resource.
 * @param session running solid session
 * @param resourceUrl url of resource to add public append access to
 * @returns object containing info about the created access configuration
 */
const addPublicAppendAccess = async (
  session: Session,
  resourceUrl: URL
): Promise<AccessModes | null> => {
  return await universalAccess.setPublicAccess(
    resourceUrl.toString(),
    { append: true },
    { fetch: session.fetch }
  );
};

/**
 * Creates missing necessary data and access configuration using provided
 * verified data object. Creates "stammdaten" folder, "stammdaten.ttl" file
 * inside "stammdaten" folder, "inbox" folder with public append access enabled
 * if they are missing.
 * @param session running solid session
 * @param storage url of storage to use for data creation
 * @param webId user webId used as subject in created data
 * @param verifiedFolderStructure object containing info about existing and missing data
 */
export const createCitizenFolderStructure = async (
  session: Session,
  storage: string,
  webId: string,
  verifiedFolderStructure: ValidAndVerifiedFolderStructure
): Promise<void> => {
  const storageUrl = createUrl(storage);
  const stammdatenFolderUrl = createUrl(STAMMDATEN_FOLDER_PATH, storage);
  const inboxFolderUrl = createUrl(INBOX_FOLDER_PATH, storage);

  if (!verifiedFolderStructure.stammdatenFolderExists) {
    await createContainer({
      url: storageUrl,
      name: STAMMDATEN_FOLDER_NAME,
      session,
    });
  }

  if (!verifiedFolderStructure.stammdatenFileExists) {
    await createStammdatenFile(session, webId, stammdatenFolderUrl);
  }

  if (!verifiedFolderStructure.inboxFolderExists) {
    await createContainer({
      url: storageUrl,
      name: INBOX_FOLDER_NAME,
      session,
    });
  }

  if (!verifiedFolderStructure.inboxFolderPublicAppendAccessExists) {
    await addPublicAppendAccess(session, inboxFolderUrl);
  }
};
