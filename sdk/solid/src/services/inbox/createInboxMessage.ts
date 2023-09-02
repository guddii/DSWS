import { createSolidDataset } from "@inrupt/solid-client";
import { createInboxMessageHeader } from "./createInboxMessageHeader";
import { createInboxMessageBody } from "./createInboxMessageBody";
import {
  IInboxMessageConfig,
  IInboxMessageData,
  IInboxMessageRecipient,
  IInboxMessageSender,
  IInboxMessageType,
} from "./InboxMessage";

export type ICreateInboxMessage = IInboxMessageConfig &
  IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageType &
  IInboxMessageData;

/**
 * Creates an inbox message
 * @param config
 * @param recipient
 * @param sender
 * @param messageType
 * @param data
 */
export const createInboxMessage = ({
  config,
  recipient,
  sender,
  messageType,
  data,
}: ICreateInboxMessage) => {
  const { date, target } = config;
  const header = { date, target };

  let dataset = createSolidDataset();
  dataset = createInboxMessageHeader(dataset, {
    recipient,
    sender,
    messageType,
    header,
    data,
  });
  dataset = createInboxMessageBody(dataset, { data });

  return dataset;
};
