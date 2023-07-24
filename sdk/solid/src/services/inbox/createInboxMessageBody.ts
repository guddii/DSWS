import { SolidDataset } from "@inrupt/solid-client";
import {
  buildThing,
  createThing,
  removeFilename,
  schema,
  setThing,
  toUrlString,
  WS,
} from "../../index";
import {
  IInboxMessageData,
  IInboxMessageRecipient,
  IInboxMessageSender,
} from "./InboxMessage";

type ICreateMessageBody = IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageData;

/**
 * Creates the header of an inbox message
 * @param dataset
 * @param recipient
 * @param message
 */
export const createInboxMessageBody = (
  dataset: SolidDataset,
  { recipient, data }: ICreateMessageBody
): SolidDataset => {
  const messageBody = buildThing(createThing({ url: recipient.webId }))
    .addUrl(schema.subjectOf, data.reference)
    .addUrl(WS.storage, toUrlString(removeFilename(data.reference)))
    .build();

  return setThing(dataset, messageBody);
};
