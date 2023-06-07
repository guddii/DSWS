import { useSession } from "@inrupt/solid-ui-react";
import { LDP } from "@inrupt/lit-generated-vocab-common";
import { logger } from "../services/logger";
import { checkResponse } from "../helper/checkResponse";

interface IResourceOptions {
  url: URL;
  headers?: Record<string, string>;
  loggerOptions?: any;
}

interface IBodyResourceOptions {
  body?: BodyInit;
}

export const useResource = () => {
  const { session } = useSession();
  const fetch = session?.fetch || window.fetch;

  const getResource = async (
    options: IResourceOptions
  ): Promise<Response | void> => {
    const headers = options.headers || {};
    if (!headers["Accept"]) {
      headers["Accept"] = "text/turtle,application/ld+json";
    }

    return await fetch(options.url, { headers })
      .then(checkResponse)
      .catch((error) =>
        logger({ caller: "getResource", ...options.loggerOptions, error })
      );
  };

  const postResource = async (
    options: IResourceOptions & IBodyResourceOptions
  ): Promise<Response | void> => {
    const headers = options.headers || {};
    if (!headers["Content-type"]) {
      headers["Content-type"] = "text/plain";
    }

    return await fetch(options.url, {
      method: "POST",
      headers,
      body: options.body,
    })
      .then(checkResponse)
      .catch((error) =>
        logger({ caller: "postResource", ...options.loggerOptions, error })
      );
  };

  const createResource = (
    options: IResourceOptions & IBodyResourceOptions
  ): Promise<Response | void> => {
    const headers = options.headers || {};
    if (!headers["Content-type"]) {
      headers["Content-type"] = "text/turtle";
    }
    headers["Link"] = `<${LDP.Resource.iri.value}>; rel="type"`;

    return postResource({
      url: options.url,
      headers,
      body: options.body,
      loggerOptions: {
        caller: "createResource",
        ...options.loggerOptions,
      },
    });
  };

  const putResource = async (
    options: IResourceOptions & IBodyResourceOptions
  ): Promise<Response | void> => {
    const headers = options.headers || {};
    if (!headers["Content-type"]) {
      headers["Content-type"] = "text/turtle";
    }
    headers["Link"] = `<${LDP.Resource.iri.value}>; rel="type"`;

    return await fetch(options.url, {
      method: "PUT",
      headers,
      body: options.body,
    })
      .then(checkResponse)
      .catch((error) =>
        logger({ caller: "putResource", ...options.loggerOptions, error })
      );
  };

  const deleteResource = async (
    options: IResourceOptions
  ): Promise<Response | void> => {
    return await fetch(options.url, {
      method: "DELETE",
      headers: options.headers,
    })
      .then(checkResponse)
      .catch((error) =>
        logger({ caller: "deleteResource", ...options.loggerOptions, error })
      );
  };

  return {
    getResource,
    postResource,
    createResource,
    putResource,
    deleteResource,
  };
};
