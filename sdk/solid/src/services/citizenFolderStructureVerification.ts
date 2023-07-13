import {
  WithServerResourceInfo,
  getResourceInfo,
  AccessModes,
  universalAccess,
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";
import { toUrlString, createUrl } from "../helper/urlHelper";
import {
  INBOX_FOLDER_PATH,
  STAMMDATEN_FILE_PATH,
  STAMMDATEN_FOLDER_PATH,
} from "../config";

type VerifiedFolderStructure = {
  stammdatenFolderExists: boolean;
  stammdatenFileExists: boolean;
  inboxFolderExists: boolean;
  inboxFolderPublicAppendAccessExists: boolean;
};

type ValidFolderStructure = {
  validFolderStructure: boolean;
};

export type ValidAndVerifiedFolderStructure = VerifiedFolderStructure &
  ValidFolderStructure;

/**
 * Checks provided resource by fetching the resource info.
 * @param session running solid session
 * @param resourceUrl url of resource to check
 * @returns the info object or null if object doesn't exist
 */
const checkResourceInfo = async (
  session: Session,
  resourceUrl: URL
): Promise<WithServerResourceInfo | null> => {
  try {
    return await getResourceInfo(toUrlString(resourceUrl), {
      fetch: session.fetch,
    });
  } catch (error: any) {
    if (error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Checks acl configuation of provided resource.
 * @param session running solid session
 * @param resourceUrl url of resource to check
 * @returns the acl configuration object or null if acl doesn't exist
 */
const checkResourceAcl = async (
  session: Session,
  resourceUrl: URL
): Promise<AccessModes | null> => {
  try {
    return await universalAccess.getPublicAccess(toUrlString(resourceUrl), {
      fetch: session.fetch,
    });
  } catch (error: any) {
    if (error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Checks if any of the entries of the provided data object is set to be missing.
 * @param verifiedData object containing info about existing and missing data
 * @returns info if any of the data entries is missing
 */
const isFolderStructureValid = (
  verifiedFolderStructure: VerifiedFolderStructure | null
): boolean => {
  if (!verifiedFolderStructure) {
    return false;
  }
  return Object.values(verifiedFolderStructure).every((exists) => exists);
};

/**
 * Verifies that the necessary data exists and has correct access configuration
 * in provided storage. Checks if "stammdaten" folder exists, "stammdaten.ttl"
 * file exists inside "stammdaten" folder, "inbox" folder exists and has public
 * append access enabled.
 * @param session running solid session
 * @param storage url of storage to use for data verification
 * @returns verified data object containing info about existing and missing data
 */
export const verifyCitizenFolderStructure = async (
  session: Session,
  storage: string
): Promise<ValidAndVerifiedFolderStructure> => {
  const verifiedFolderStructure: VerifiedFolderStructure = {
    stammdatenFolderExists: false,
    stammdatenFileExists: false,
    inboxFolderExists: false,
    inboxFolderPublicAppendAccessExists: false,
  };

  const stammdatenFolderUrl = createUrl(STAMMDATEN_FOLDER_PATH, storage);
  const stammdatenFileUrl = createUrl(STAMMDATEN_FILE_PATH, storage);
  const inboxFolderUrl = createUrl(INBOX_FOLDER_PATH, storage);

  // check stammdaten folder
  const stammdatenFolderInfo = await checkResourceInfo(
    session,
    stammdatenFolderUrl
  );
  verifiedFolderStructure.stammdatenFolderExists = !!stammdatenFolderInfo;

  // check stammdaten file
  const stammdatenFileInfo = await checkResourceInfo(
    session,
    stammdatenFileUrl
  );
  verifiedFolderStructure.stammdatenFileExists = !!stammdatenFileInfo;

  // check inbox folder
  const inboxFolderInfo = await checkResourceInfo(session, inboxFolderUrl);
  verifiedFolderStructure.inboxFolderExists = !!inboxFolderInfo;

  // check inbox public append access
  const inboxFolderAcl = await checkResourceAcl(session, inboxFolderUrl);
  verifiedFolderStructure.inboxFolderPublicAppendAccessExists =
    !!inboxFolderAcl?.append;

  // check if everything is valid
  const validFolderStructure: ValidFolderStructure["validFolderStructure"] =
    isFolderStructureValid(verifiedFolderStructure);

  return {
    ...verifiedFolderStructure,
    validFolderStructure,
  };
};
