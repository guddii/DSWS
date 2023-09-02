import { UrlString, WebId } from "@inrupt/solid-client";
import {
  getCreatorPredicateString,
  getCreatorPredicateUrl,
} from "./helper/getCreatorPredicate";

export const STAMMDATEN_FOLDER_NAME = "stammdaten";
export const STAMMDATEN_FOLDER_PATH = `${STAMMDATEN_FOLDER_NAME}/`;

export const STAMMDATEN_FILE_NAME = "stammdaten.ttl";
export const STAMMDATEN_FILE_PATH = `${STAMMDATEN_FOLDER_NAME}/${STAMMDATEN_FILE_NAME}`;

export const INBOX_FOLDER_NAME = "inbox";
export const INBOX_FOLDER_PATH = `${INBOX_FOLDER_NAME}/`;

export const HAS_TAX_DATA: UrlString =
  "http://custom-predicates.org/hasTaxData";

export const HAS_TAX_DATA_CREATOR: UrlString =
  getCreatorPredicateString(HAS_TAX_DATA);

export const HAS_LAND_REGISTRY_DATA: UrlString =
  "http://custom-predicates.org/hasLandRegistryData";

export const HAS_LAND_REGISTRY_DATA_CREATOR: UrlString =
  getCreatorPredicateString(HAS_LAND_REGISTRY_DATA);

export const MESSAGE_TYPE: UrlString =
  "http://custom-predicates.org/messageType";

export const TAX_OFFICE_WEB_ID: WebId = "https://id.inrupt.com/taxofficeapp";
export const LAND_REGISTRY_OFFICE_WEB_ID: WebId =
  "https://id.inrupt.com/landregistryofficeapp";

export const SENDER_TO_PROPERTY_MAP: Record<WebId, UrlString> = {
  [TAX_OFFICE_WEB_ID]: HAS_TAX_DATA,
  [LAND_REGISTRY_OFFICE_WEB_ID]: HAS_LAND_REGISTRY_DATA,
};
