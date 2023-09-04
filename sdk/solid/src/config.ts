import { UrlString, WebId } from "@inrupt/solid-client";
import { GOV } from "./vocab/GOV";

export const STAMMDATEN_FOLDER_NAME = "stammdaten";
export const STAMMDATEN_FOLDER_PATH = `${STAMMDATEN_FOLDER_NAME}/`;

export const STAMMDATEN_FILE_NAME = "stammdaten.ttl";
export const STAMMDATEN_FILE_PATH = `${STAMMDATEN_FOLDER_NAME}/${STAMMDATEN_FILE_NAME}`;

export const INBOX_FOLDER_NAME = "inbox";
export const INBOX_FOLDER_PATH = `${INBOX_FOLDER_NAME}/`;

export const MESSAGE_TYPE: UrlString =
  "http://custom-predicates.org/messageType";

export const TAX_OFFICE_WEB_ID: WebId = "https://id.inrupt.com/taxofficeapp";
export const LAND_REGISTRY_OFFICE_WEB_ID: WebId =
  "https://id.inrupt.com/landregistryofficeapp";

export const SENDER_TO_PROPERTY_MAP: Record<WebId, UrlString> = {
  [TAX_OFFICE_WEB_ID]: GOV.TaxDeclaration.value,
  [LAND_REGISTRY_OFFICE_WEB_ID]: GOV.PropertyData.value,
};
