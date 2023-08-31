import { Typography } from "antd";
import {
  MESSAGE_TYPE,
  MessageTypes,
  getStringNoLocale,
  getStringWithLocale,
  schema,
} from "solid";
import { InboxMessageHeader } from "./InboxMessageCard";
import { useLocaleFromPath, useTranslation } from "i18n/client";

const { Title, Text } = Typography;

const messageTypeHeaderMap: Record<string, string> = {
  [MessageTypes.SAVE_TO_DATA_MESSAGE]:
    "sdk.ui.components.inbox.InboxMessageCardText.saveToDataMessage",
  [MessageTypes.REQUEST_ACCESS_MESSAGE]:
    "sdk.ui.components.inbox.InboxMessageCardText.requestAccessMessage",
};

interface IInboxMessageCardTextProperties {
  inboxMessageHeader?: InboxMessageHeader;
}

export const InboxMessageCardText = ({
  inboxMessageHeader,
}: IInboxMessageCardTextProperties) => {
  const t = useTranslation();
  const currentLocale = useLocaleFromPath();

  if (!inboxMessageHeader) {
    return null;
  }

  const messageType = getStringNoLocale(inboxMessageHeader, MESSAGE_TYPE);
  let messageHeader = t("sdk.ui.components.inbox.InboxMessageCardText.unknown");
  if (messageType && messageTypeHeaderMap[messageType]) {
    messageHeader = t(messageTypeHeaderMap[messageType]);
  }
  const messageText =
    getStringWithLocale(inboxMessageHeader, schema.text, currentLocale) ||
    getStringNoLocale(inboxMessageHeader, schema.text) ||
    t("_.empty");

  return (
    <>
      <Title level={5}>{messageHeader}</Title>
      <Text>{messageText}</Text>
    </>
  );
};
