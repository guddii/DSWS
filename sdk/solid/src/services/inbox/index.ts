import { saveSolidDatasetInContainer } from "@inrupt/solid-client";
import { createInboxMessage } from "./createInboxMessage";
import { createInboxMessageConfig } from "./createInboxMessageConfig";
import {
  IInboxMessageData,
  IInboxMessageRecipient,
  IInboxMessageSender,
  IInboxMessageType,
} from "./InboxMessage";

export type SendInboxMessage = IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageType &
  IInboxMessageData;

export const sendInboxMessage = async ({
  recipient,
  sender,
  messageType,
  data,
}: SendInboxMessage) => {
  const { config } = createInboxMessageConfig({ recipient });
  const dataset = await createInboxMessage({
    config,
    recipient,
    sender,
    messageType,
    data,
  });

  await saveSolidDatasetInContainer(config.container, dataset, {
    slugSuggestion: config.filename,
  });
};
