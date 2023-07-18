import { createUrl, toUrlString } from "../helper/urlHelper";
import { UrlString } from "@inrupt/solid-client";

/**
 * All accepted solid providers as constants
 */
export const ID_INRUPT_COM = createUrl("https://login.inrupt.com");

/**
 * The accepted solid providers as list
 */
export const OIDC_ISSUER = [ID_INRUPT_COM];

/**
 * The default solid provider
 */
export const DEFAULT_OIDC_ISSUER = OIDC_ISSUER[0];

/**
 * A map of solid providers and web id factories functions
 */
export const webIdFactories: Map<UrlString, (username: string) => UrlString> =
  new Map([
    [
      toUrlString(ID_INRUPT_COM),
      function (username) {
        return `https://id.inrupt.com/${username}`;
      },
    ],
  ]);
