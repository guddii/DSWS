import { Typography } from "antd";
import { MESSAGE_TYPE, MessageTypes, getStringNoLocale, schema } from "solid";
import { InboxMessageHeader } from "./InboxMessageCard";
import { useTranslation } from "i18n/client";

const { Title, Text } = Typography;

const messageTypeHeaderMap: Record<string, string> = {
  [MessageTypes.SAVE_TO_DATA_MESSAGE]:
    "The sender provides you with some data to save to your data vault.",
  [MessageTypes.REQUEST_ACCESS_MESSAGE]:
    "A third party requests access to a referenced resource in your data vault.",
};

interface IInboxMessageCardTextProperties {
  inboxMessageHeader?: InboxMessageHeader;
}

export const InboxMessageCardText = ({
  inboxMessageHeader,
}: IInboxMessageCardTextProperties) => {
  const t = useTranslation();

  if (!inboxMessageHeader) {
    return null;
  }

  const messageType = getStringNoLocale(inboxMessageHeader, MESSAGE_TYPE);
  let messageHeader = "Unknown message type.";
  if (messageType && messageTypeHeaderMap[messageType]) {
    messageHeader = messageTypeHeaderMap[messageType];
  }
  const messageText =
    getStringNoLocale(inboxMessageHeader, schema.text) || t("_.empty");

  return (
    <>
      <Title level={5}>{messageHeader}</Title>
      <Text>{messageText}</Text>
    </>
  );
};
