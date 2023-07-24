import { UrlString } from "@inrupt/solid-client";
import * as path from "path";

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

/**
 * Returns a new URL
 * @param url
 * @param base
 */
export const createUrl = (url: UrlString | URL, base?: UrlString | URL) => {
  return new URL(url, base);
};

/**
 * Removes the hash from a URL
 * @param url
 */
export const removeHashFromUrl = (url: UrlString | URL): URL => {
  return replaceHashInUrl(url, "");
};

/**
 * Returns a URL with a given hash
 * @param url
 * @param hash
 */
export const replaceHashInUrl = (url: UrlString | URL, hash?: string): URL => {
  const modifiedUrl: URL = createUrl(url);
  modifiedUrl.hash = hash ?? "";
  return modifiedUrl;
};

/**
 * Returns a URL with a given pathname
 * @param url
 * @param pathname
 */
export const replacePathnameInUrl = (
  url: UrlString | URL,
  pathname?: string
): URL => {
  const modifiedUrl: URL = createUrl(url);
  modifiedUrl.pathname = pathname ?? "";
  return modifiedUrl;
};

/**
 * Removes the filename from a URL
 * @param url
 */
export const removeFilename = (url: UrlString | URL) => {
  const { dir } = path.parse(toUrlString(url));
  return createUrl(dir);
};
