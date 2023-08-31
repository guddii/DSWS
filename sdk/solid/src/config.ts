import { UrlString, WebId } from "@inrupt/solid-client";

export const STAMMDATEN_FOLDER_NAME = "stammdaten";
export const STAMMDATEN_FOLDER_PATH = `${STAMMDATEN_FOLDER_NAME}/`;

export const STAMMDATEN_FILE_NAME = "stammdaten.ttl";
export const STAMMDATEN_FILE_PATH = `${STAMMDATEN_FOLDER_NAME}/${STAMMDATEN_FILE_NAME}`;

export const INBOX_FOLDER_NAME = "inbox";
export const INBOX_FOLDER_PATH = `${INBOX_FOLDER_NAME}/`;

export const HAS_TAX_DATA: UrlString =
  "http://custom-predicates.org/hasTaxData";
export const HAS_LAND_REGISTRY_DATA: UrlString =
  "http://custom-predicates.org/hasLandRegistryData";

export const MESSAGE_TYPE: UrlString =
  "http://custom-predicates.org/messageType";

export const TAX_OFFICE_WEB_ID: WebId = "https://id.inrupt.com/taxofficeapp";
export const LAND_REGISTRY_OFFICE_WEB_ID: WebId =
  "https://id.inrupt.com/landregistryofficeapp";

export const CITIZEN_APP_URL: UrlString =
  process.env.NEXT_PUBLIC_CITIZEN_APP_URL ||
  "https://solid-showcase-citizen.vercel.app";

export const TAX_OFFICE_APP_URL: UrlString =
  process.env.NEXT_PUBLIC_TAX_OFFICE_APP_URL ||
  "https://solid-showcase-tax-office.vercel.app";

export const LAND_REGISTRY_OFFICE_APP_URL: UrlString =
  process.env.NEXT_PUBLIC_LAND_REGISTRY_OFFICE_APP_URL ||
  "https://solid-showcase-land-registry-office.vercel.app";

export const SENDER_TO_PROPERTY_MAP: Record<WebId, UrlString> = {
  [TAX_OFFICE_WEB_ID]: HAS_TAX_DATA,
  [LAND_REGISTRY_OFFICE_WEB_ID]: HAS_LAND_REGISTRY_DATA,
};
