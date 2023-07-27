import { Typography } from "antd";
import { getStringNoLocale, schema } from "solid";
import { Message } from "./InboxMessageCard";

const { Paragraph } = Typography;

interface IInboxMessageCardTextProperties {
  message?: Message;
}

export const InboxMessageCardText = ({
  message,
}: IInboxMessageCardTextProperties) => {
  if (!message) {
    return <Paragraph>Message is empty.</Paragraph>;
  }

  return <Paragraph>{getStringNoLocale(message, schema.text)}</Paragraph>;
};
