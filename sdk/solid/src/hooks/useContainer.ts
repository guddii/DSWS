import { LDP } from "@inrupt/lit-generated-vocab-common";
import { logger } from "../services/logger";
import { useResource } from "./useResource";
import { ParsedN3, parseToN3 } from "../services/n3";

interface IContainerOptions {
  url: URL;
  headers?: Record<string, string>;
  loggerOptions?: any;
}

interface ICreateContainerOptions {
  name: string;
}

export const useContainer = () => {
  const { getResource, postResource } = useResource();

  const createContainer = (
    options: IContainerOptions & ICreateContainerOptions
  ): Promise<Response | void> => {
    const headers = options.headers || {};
    headers["Link"] = `<${LDP.BasicContainer.iri.value}>; rel="type"`;
    headers["Slug"] = options.name;

    return postResource({
      url: options.url,
      headers,
      body: undefined,
      loggerOptions: {
        caller: "createContainer",
        ...options.loggerOptions,
      },
    });
  };

  const getContainerItems = async (
    options: IContainerOptions
  ): Promise<{
    containerItems: Array<string>;
    firstContainerItem: string;
  }> => {
    const resource: Response | void = await getResource({
      url: options.url,
      headers: options.headers,
      loggerOptions: {
        caller: "getContainerItems",
        ...options.loggerOptions,
      },
    });

    if (!resource) {
      return { containerItems: [], firstContainerItem: "" };
    }

    const resourceText: string = await resource.text();
    const parsedN3: ParsedN3 | void = await parseToN3({
      url: options.url,
      text: resourceText,
    }).catch((error) =>
      logger({ caller: "parseToN3", ...options.loggerOptions, error })
    );

    if (!parsedN3) {
      return { containerItems: [], firstContainerItem: "" };
    }

    const containerItems: Array<string> = parsedN3.store
      .getObjects(options.url.toString(), LDP.contains.iri.value, null)
      .map((obj) => obj.value);
    const firstContainerItem: string = containerItems[0];

    return { containerItems, firstContainerItem };
  };

  return {
    createContainer,
    getContainerItems,
  };
};
