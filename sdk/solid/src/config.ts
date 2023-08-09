import { UrlString } from "@inrupt/solid-client";

export const STAMMDATEN_FOLDER_NAME = "stammdaten";
export const STAMMDATEN_FOLDER_PATH = `${STAMMDATEN_FOLDER_NAME}/`;

export const STAMMDATEN_FILE_NAME = "stammdaten.ttl";
export const STAMMDATEN_FILE_PATH = `${STAMMDATEN_FOLDER_NAME}/${STAMMDATEN_FILE_NAME}`;

export const INBOX_FOLDER_NAME = "inbox";
export const INBOX_FOLDER_PATH = `${INBOX_FOLDER_NAME}/`;

export const HAS_TAX_DATA = "http://custom-predicates.org/hasTaxData";

export const HAS_LAND_REGISTRY_DATA =
  "http://custom-predicates.org/hasLandRegistryData";

export const SENDER_TO_PROPERTY_MAP: Record<UrlString, UrlString> = {
  "https://id.inrupt.com/taxofficeapp": HAS_TAX_DATA,
  "https://id.inrupt.com/landregistryofficeapp": HAS_LAND_REGISTRY_DATA,
};
