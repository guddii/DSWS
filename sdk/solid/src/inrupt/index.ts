export { WS } from "@inrupt/vocab-solid";

export { FOAF, LDP, RDF } from "@inrupt/lit-generated-vocab-common";

export { SCHEMA_INRUPT, DCTERMS } from "@inrupt/vocab-common-rdf";

export type {
  UrlString,
  Thing,
  WebId,
  SolidDataset,
  WithServerResourceInfo,
} from "@inrupt/solid-client";

export { schema } from "rdf-namespaces";

export {
  asUrl,
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
  setStringNoLocale,
  addStringNoLocale,
  getSourceUrl,
} from "@inrupt/solid-client";

export { Session, fetch } from "@inrupt/solid-client-authn-browser";
