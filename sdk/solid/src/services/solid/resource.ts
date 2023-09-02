import { LDP } from "@inrupt/lit-generated-vocab-common";
import { Session as SessionBrowser } from "@inrupt/solid-client-authn-browser";
import { Session as SessionNode } from "@inrupt/solid-client-authn-node";
import { checkResponse } from "../../helper/checkResponse";

export interface IResourceOptions {
  url: URL;
  headers?: Record<string, string>;
  session?: SessionBrowser | SessionNode;
}

export interface IResourceBodyOptions extends IResourceOptions {
  body?: BodyInit;
}

export const getResource = async (
  options: IResourceOptions
): Promise<Response> => {
  const headers = options.headers || {};
  if (!headers["Accept"]) {
    headers["Accept"] = "text/turtle,application/ld+json";
  }
  if (!options.session) {
    throw new Error("session missing");
  }

  const fetch = options.session.fetch || window.fetch;

  try {
    const data = await fetch(options.url, { headers });

    return await checkResponse(data);
  } catch (error: any) {
    throw error;
  }
};

export const postResource = async (
  options: IResourceBodyOptions
): Promise<Response> => {
  const headers = options.headers || {};
  if (!headers["Content-type"]) {
    headers["Content-type"] = "text/plain";
  }

  if (!options.session) {
    throw new Error("session missing");
  }

  const fetch = options.session.fetch || window.fetch;

  try {
    const data = await fetch(options.url, {
      method: "POST",
      headers,
      body: options.body,
    });

    return await checkResponse(data);
  } catch (error: any) {
    throw error;
  }
};

export const createResource = (
  options: IResourceBodyOptions
): Promise<Response> => {
  const headers = options.headers || {};
  if (!headers["Content-type"]) {
    headers["Content-type"] = "text/turtle";
  }
  headers["Link"] = `<${LDP.Resource.iri.value}>; rel="type"`;

  return putResource({
    url: options.url,
    headers,
    body: options.body,
    session: options.session,
  });
};

export const putResource = async (
  options: IResourceBodyOptions
): Promise<Response> => {
  const headers = options.headers || {};
  if (!headers["Content-type"]) {
    headers["Content-type"] = "text/turtle";
  }
  headers["Link"] = `<${LDP.Resource.iri.value}>; rel="type"`;

  if (!options.session) {
    throw new Error("session missing");
  }

  const fetch = options.session.fetch || window.fetch;

  try {
    const data = await fetch(options.url, {
      method: "PUT",
      headers,
      body: options.body,
    });

    return await checkResponse(data);
  } catch (error: any) {
    throw error;
  }
};
