import { getSolidDataset, SolidDataset } from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";

export interface IGetDatasetOptions {
  datasetUrl?: URL;
  session?: Session;
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
