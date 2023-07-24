import { saveSolidDatasetInContainer } from "@inrupt/solid-client";
import { createInboxMessage } from "./createInboxMessage";
import { createInboxMessageConfig } from "./createInboxMessageConfig";
import {
  IInboxMessageData,
  IInboxMessageRecipient,
  IInboxMessageSender,
} from "./InboxMessage";

export type SendInboxMessage = IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageData;

export const sendInboxMessage = async ({
  recipient,
  sender,
  data,
}: SendInboxMessage) => {
  const { config } = createInboxMessageConfig({ recipient });
  const dataset = createInboxMessage({ config, recipient, sender, data: data });

  await saveSolidDatasetInContainer(config.container, dataset, {
    slugSuggestion: config.filename,
  });
};
