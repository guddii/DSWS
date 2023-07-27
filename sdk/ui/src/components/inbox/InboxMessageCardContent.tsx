import { Typography } from "antd";
import { getUrl, schema } from "solid";
import { Content } from "./InboxMessageCard";

const { Paragraph } = Typography;

interface IInboxMessageCardContentProperties {
  content?: Content;
}

export const InboxMessageCardContent = ({
  content,
}: IInboxMessageCardContentProperties) => {
  if (!content) {
    return null;
  }

  return <Paragraph>{getUrl(content, schema.subjectOf)}</Paragraph>;
};
