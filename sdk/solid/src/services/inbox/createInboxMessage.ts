import { createSolidDataset } from "@inrupt/solid-client";
import { createInboxMessageHeader } from "./createInboxMessageHeader";
import { createInboxMessageBody } from "./createInboxMessageBody";
import {
  IInboxMessageConfig,
  IInboxMessageData,
  IInboxMessageRecipient,
  IInboxMessageSender,
} from "./InboxMessage";

export type ICreateInboxMessage = IInboxMessageConfig &
  IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageData;

/**
 * Creates an inbox message
 * @param config
 * @param recipient
 * @param sender
 * @param data
 */
export const createInboxMessage = ({
  config,
  recipient,
  sender,
  data,
}: ICreateInboxMessage) => {
  const { date, target } = config;
  const header = { date, target };

  let dataset = createSolidDataset();
  dataset = createInboxMessageHeader(dataset, { recipient, sender, header });
  dataset = createInboxMessageBody(dataset, { recipient, sender, data: data });

  return dataset;
};
