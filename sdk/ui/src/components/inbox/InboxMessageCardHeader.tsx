import { Typography } from "antd";
import { getDatetime, getUrl, schema } from "solid";
import { Message } from "./InboxMessageCard";

const { Text, Title } = Typography;

interface IInboxMessageCardHeaderProperties {
  message?: Message;
}

export const InboxMessageCardHeader = ({
  message,
}: IInboxMessageCardHeaderProperties) => {
  if (!message) {
    return <>Message Information could not be read!</>;
  }

  const dateTime = getDatetime(message, schema.dateSent);
  let formattedDateTime = "";
  if (dateTime) {
    formattedDateTime = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeStyle: "long",
    }).format(dateTime);
  }

  return (
    <>
      <Title level={5} style={{ marginBottom: 0 }}>
        From: {getUrl(message, schema.sender)}
      </Title>
      <Text type="secondary" style={{ fontWeight: 400 }}>
        {formattedDateTime}
      </Text>
    </>
  );
};
