import { Typography } from "antd";
import { getStringNoLocale, schema } from "solid";
import { InboxMessage } from "./InboxMessageCard";

const { Paragraph } = Typography;

interface IInboxMessageCardTextProperties {
  inboxMessage?: InboxMessage;
}

export const InboxMessageCardText = ({
  inboxMessage,
}: IInboxMessageCardTextProperties) => {
  if (!inboxMessage) {
    return <Paragraph>Message is empty.</Paragraph>;
  }

  return <Paragraph>{getStringNoLocale(inboxMessage, schema.text)}</Paragraph>;
};
