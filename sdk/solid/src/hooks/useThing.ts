import * as inrupt from "@inrupt/solid-ui-react";
export type { Thing } from "@inrupt/solid-client";

interface IUseThingOptions {
  datasetUrl: URL;
  thingUrl: URL;
  options?: any;
}

export const useThing = (options: IUseThingOptions) => {
  const datasetIri: string = options.datasetUrl.toString();
  const thingIri: string = options.thingUrl.toString();
  return inrupt.useThing(datasetIri, thingIri, options.options);
};
