import { Typography } from "antd";
import { getUrl, schema } from "solid";
import { InboxMessageContent } from "./InboxMessageCard";

const { Paragraph } = Typography;

interface IInboxMessageCardContentProperties {
  inboxMessageContent?: InboxMessageContent;
}

export const InboxMessageCardContent = ({
  inboxMessageContent,
}: IInboxMessageCardContentProperties) => {
  if (!inboxMessageContent) {
    return null;
  }

  return <Paragraph>{getUrl(inboxMessageContent, schema.subjectOf)}</Paragraph>;
};
