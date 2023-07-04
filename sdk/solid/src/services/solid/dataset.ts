import { getSolidDataset, SolidDataset } from "@inrupt/solid-client";
import { Session as SessionBrowser } from "@inrupt/solid-client-authn-browser";
import { Session as SessionNode } from "@inrupt/solid-client-authn-node";

export interface IGetDatasetOptions {
  datasetUrl?: URL;
  session?: SessionBrowser | SessionNode;
}

export const getDataset = async (
  options: IGetDatasetOptions
): Promise<SolidDataset> => {
  if (!options.datasetUrl) {
    throw new Error("datasetUrl missing");
  }
  if (!options.session) {
    throw new Error("session missing");
  }

  const requestOptions = {
    fetch: options.session.fetch || window.fetch,
  };

  try {
    return await getSolidDataset(options.datasetUrl.toString(), requestOptions);
  } catch (error: any) {
    throw error;
  }
};
