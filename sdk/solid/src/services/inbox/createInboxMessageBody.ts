import {
  addBoolean,
  addStringNoLocale,
  addUrl,
  createThing,
  setThing,
  SolidDataset,
  Thing,
} from "@inrupt/solid-client";
import { IInboxMessageData } from "./InboxMessage";

type ICreateMessageBody = IInboxMessageData;

const typeToFunctionMap: Record<
  string,
  (thing: Thing, predicate: string, value: any) => Thing
> = {
  url: addUrl,
  string: addStringNoLocale,
  boolean: addBoolean,
};

/**
 * Creates the body of an inbox message
 * @param data
 */
export const createInboxMessageBody = (
  dataset: SolidDataset,
  { data }: ICreateMessageBody
): SolidDataset => {
  let messageBody = createThing({ url: data.subject });

  data.entries.forEach((entry) => {
    const addEntry = typeToFunctionMap[entry.type];
    if (addEntry) {
      messageBody = addEntry(messageBody, entry.predicate, entry.value);
    }
  });

  return setThing(dataset, messageBody);
};
