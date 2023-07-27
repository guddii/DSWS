export { WS } from "@inrupt/vocab-solid";

export { FOAF, LDP, RDF } from "@inrupt/lit-generated-vocab-common";

export { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";

export type { UrlString, Thing, WebId } from "@inrupt/solid-client";

export { schema } from "rdf-namespaces";

export {
  getThing,
  buildThing,
  createThing,
  setThing,
  getThingAll,
  getSolidDataset,
  saveSolidDatasetAt,
  deleteSolidDataset,
  universalAccess,
  getPodUrlAll,
  createSolidDataset,
  saveSolidDatasetInContainer,
  getUrl,
  getUrlAll,
  getDatetime,
  getStringNoLocale,
} from "@inrupt/solid-client";

export { Session, fetch } from "@inrupt/solid-client-authn-browser";
