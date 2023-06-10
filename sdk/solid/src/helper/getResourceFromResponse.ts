import { replacePathnameInUrl } from "./urlHelper";

/**
 * Gets the URL to a created resource from a HTTP response object.
 * @param response HTTP response
 * @returns URL to generated resource or null if information is missing
 */
export const getResourceFromResponse = (response: Response): URL | null => {
  const baseUrl = `${response.url}${response.url.endsWith("/") ? "" : "/"}`;

  const locationHeader = response.headers.get("location");

  if (!locationHeader) {
    return null;
  }

  const resourceName = locationHeader.split("/").pop();

  return replacePathnameInUrl(baseUrl, resourceName);
};
