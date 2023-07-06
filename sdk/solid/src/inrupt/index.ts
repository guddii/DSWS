export { WS } from "@inrupt/vocab-solid";

export { FOAF, LDP } from "@inrupt/lit-generated-vocab-common";

export type {
  UrlString,
  Thing,
  WithServerResourceInfo,
  AccessModes,
} from "@inrupt/solid-client";

export {
  getResourceInfo,
  buildThing,
  createThing,
  setThing,
  getSolidDataset,
  saveSolidDatasetAt,
  universalAccess,
} from "@inrupt/solid-client";

export { Session } from "@inrupt/solid-client-authn-browser";
