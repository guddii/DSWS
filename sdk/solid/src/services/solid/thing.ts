import { Thing, getThing as getSolidThing } from "@inrupt/solid-client";
import { IGetDatasetOptions, getDataset } from "./dataset";
import { toUrlString } from "../../helper/urlHelper";

export interface IGetThingOptions extends IGetDatasetOptions {
  thingUrl?: URL;
}

export const legacyGetThing = async (
  options: IGetThingOptions
): Promise<Thing> => {
  try {
    if (!options.thingUrl) {
      throw new Error("thingUrl missing");
    }

    const dataset = await getDataset(options);
    const data = getSolidThing(dataset, toUrlString(options.thingUrl));
    if (!data) {
      throw new Error(`Thing at ${options.thingUrl} did not resolve`);
    }
    return data;
  } catch (error: any) {
    throw error;
  }
};
