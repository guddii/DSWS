import { Session } from "@inrupt/solid-client-authn-node";
import deepmerge from "deepmerge";
import { nanoid } from "nanoid";
import {
  submitDataGetDataset,
  submitDataCreateDataset,
  getValueFromDataset,
  addValueToDataset,
} from "./dataHelper";

const generateUniqueValue = () => {
  return nanoid();
};

export interface IAdditionalUniqueData {
  name: string;
  predicate: string;
}

export const createAndAddUniqueData = async (
  session: Session,
  storage: string,
  webId: string,
  additionalUniqueData: Array<IAdditionalUniqueData>
): Promise<Record<string, string>> => {
  let uniqueData: Record<string, string> = {};
  if (additionalUniqueData.length > 0) {
    const promises = await additionalUniqueData.map(
      async ({ name, predicate }) => {
        const datasetName = `${name}.ttl`;
        const dataset = await submitDataGetDataset(
          session,
          storage,
          datasetName
        );

        if (!dataset) {
          await submitDataCreateDataset(session, storage, datasetName);
        }

        let uniqueValue = await getValueFromDataset(
          session,
          storage,
          datasetName,
          webId,
          predicate,
          "string"
        );

        if (!uniqueValue) {
          uniqueValue = generateUniqueValue();
          await addValueToDataset(
            session,
            storage,
            datasetName,
            webId,
            predicate,
            uniqueValue,
            "string"
          );
        }

        return { [predicate]: uniqueValue };
      }
    );

    uniqueData = deepmerge.all<Record<string, string>>(
      await Promise.all(promises)
    );
  }

  return uniqueData;
};
