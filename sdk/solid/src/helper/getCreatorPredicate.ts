import { UrlString } from "@inrupt/solid-client";
import { createUrl, toUrlString } from "./urlHelper";

export const getCreatorPredicateUrl = (url: UrlString | URL): URL => {
  url = createUrl(url);
  url.pathname = url.pathname + "/creator";
  return url;
};

export const getCreatorPredicateString = (url: UrlString | URL): UrlString => {
  return toUrlString(getCreatorPredicateUrl(url));
};
