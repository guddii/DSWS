import { UrlString } from "@inrupt/solid-client";

/**
 * Removes the hash from a URL
 * @param url
 */
export const removeUrlHash = (url: UrlString | URL): URL => {
  const modifiedUrl: URL = new URL(url);
  modifiedUrl.hash = "";
  return modifiedUrl;
};

/**
 * Returns a UrlString from a URLString or URL object
 * @param url
 */
export const toUrlString = (url: UrlString | URL): UrlString => {
  if (typeof url === "string") {
    return url;
  }
  return url.toString();
};
