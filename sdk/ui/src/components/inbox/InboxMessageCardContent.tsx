import { Typography } from "antd";
import { getUrl, schema } from "solid";
import { InboxContent } from "./InboxMessageCard";

const { Paragraph } = Typography;

interface IInboxMessageCardContentProperties {
  inboxContent?: InboxContent;
}

export const InboxMessageCardContent = ({
  inboxContent,
}: IInboxMessageCardContentProperties) => {
  if (!inboxContent) {
    return null;
  }

  return <Paragraph>{getUrl(inboxContent, schema.subjectOf)}</Paragraph>;
};
