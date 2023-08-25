import { Typography } from "antd";
import { MESSAGE_TYPE, MessageTypes, getStringNoLocale, schema } from "solid";
import { InboxMessage } from "./InboxMessageCard";
import { useTranslation } from "i18n/client";

const { Title, Text } = Typography;

const messageTypeHeaderMap: Record<string, string> = {
  [MessageTypes.SAVE_TO_DATA_MESSAGE]:
    "The sender provides you with some data to save to your data vault.",
  [MessageTypes.REQUEST_ACCESS_MESSAGE]:
    "The sender requests access permission for the provided resource.",
};

interface IInboxMessageCardTextProperties {
  inboxMessage?: InboxMessage;
}

export const InboxMessageCardText = ({
  inboxMessage,
}: IInboxMessageCardTextProperties) => {
  const t = useTranslation();

  if (!inboxMessage) {
    return null;
  }

  const messageType = getStringNoLocale(inboxMessage, MESSAGE_TYPE);
  let messageHeader = "Unknown message type.";
  if (messageType && messageTypeHeaderMap[messageType]) {
    messageHeader = messageTypeHeaderMap[messageType];
  }
  const messageText =
    getStringNoLocale(inboxMessage, schema.text) || t("_.empty");

  return (
    <>
      <Title level={5}>{messageHeader}</Title>
      <Text>{messageText}</Text>
    </>
  );
};
