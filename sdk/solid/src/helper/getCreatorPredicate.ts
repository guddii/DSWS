import { UrlString } from "@inrupt/solid-client";

export const getCreatorPredicate = (predicate: UrlString): UrlString => {
  return predicate + "Creator";
};
