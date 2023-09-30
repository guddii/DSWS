import { VCARD } from "@inrupt/lit-generated-vocab-common";
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
  MAINDATA_FILE_NAME,
  MAINDATA_FOLDER_NAME,
  MAINDATA_FOLDER_PATH,
} from "../config";

/**
 * Creates a "maindata.ttl" turtle file inside of the provided storage. Fills
 * the created file with a basic data skeleton.
 * @param session running solid session
 * @param storage url of storage to create the new file in
 * @param webId user webId used as subject in created data
 * @returns response object of file creation
 */
const createMaindataFile = async (
  session: Session,
  webId: string,
  storage: URL
): Promise<Response> => {
  const maindataFileUrl = createUrl(MAINDATA_FILE_NAME, storage);
  const defaultData = {
    subject: webId,
    values: {
      [VCARD.family_name.value]: "",
      [VCARD.given_name.value]: "",
      [VCARD.locality.value]: "",
    },
  };

  return await createResource({
    url: maindataFileUrl,
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
 * verified data object. Creates "maindata" folder, "maindata.ttl" file
 * inside "maindata" folder, "inbox" folder with public append access enabled
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
  const maindataFolderUrl = createUrl(MAINDATA_FOLDER_PATH, storage);
  const inboxFolderUrl = createUrl(INBOX_FOLDER_PATH, storage);

  if (!verifiedFolderStructure.maindataFolderExists) {
    await createContainer({
      url: storageUrl,
      name: MAINDATA_FOLDER_NAME,
      session,
    });
  }

  if (!verifiedFolderStructure.maindataFileExists) {
    await createMaindataFile(session, webId, maindataFolderUrl);
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
