import { Session as SessionBrowser } from "@inrupt/solid-client-authn-browser";
import { Session as SessionNode } from "@inrupt/solid-client-authn-node";
import { getResource, putResource } from "./resource";
import { LDP } from "@inrupt/lit-generated-vocab-common";
import { ParsedN3, parseToN3 } from "../n3";
import { createUrl, toUrlString } from "../../helper/urlHelper";

export interface IContainerOptions {
  url: URL;
  headers?: Record<string, string>;
  session?: SessionBrowser | SessionNode;
}

export interface ICreateContainerOptions extends IContainerOptions {
  name: string;
}

export interface IGetContainerItemsResponse {
  containerItems: Array<string>;
  firstContainerItem: string;
}

export const createContainer = (
  options: ICreateContainerOptions
): Promise<Response> => {
  const headers = options.headers || {};
  headers["Link"] = `<${LDP.BasicContainer.iri.value}>; rel="type"`;
  if (!headers["Content-type"]) {
    headers["Content-type"] = "text/turtle";
  }

  return putResource({
    url: createUrl(options.name + "/", options.url),
    headers,
    session: options.session,
    body: undefined,
  });
};

export const getContainerItems = async (
  options: IContainerOptions
): Promise<IGetContainerItemsResponse> => {
  try {
    const resource: Response = await getResource(options);

    const resourceText: string = await resource.text();
    const parsedN3: ParsedN3 | void = await parseToN3({
      url: options.url,
      text: resourceText,
    });

    if (!parsedN3) {
      return { containerItems: [], firstContainerItem: "" };
    }

    const containerItems: Array<string> = parsedN3.store
      .getObjects(toUrlString(options.url), LDP.contains.iri.value, null)
      .map((obj) => obj.value);
    const firstContainerItem: string = containerItems[0];

    return { containerItems, firstContainerItem };
  } catch (error: any) {
    throw error;
  }
};
