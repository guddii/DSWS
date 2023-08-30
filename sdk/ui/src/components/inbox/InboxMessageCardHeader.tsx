import { Typography } from "antd";
import { getDatetime, getUrl, schema } from "solid";
import { InboxMessage } from "./InboxMessageCard";
import { useTranslation } from "i18n/client";

const { Text, Title } = Typography;

interface IInboxMessageCardHeaderProperties {
  inboxMessage?: InboxMessage;
}

export const InboxMessageCardHeader = ({
  inboxMessage,
}: IInboxMessageCardHeaderProperties) => {
  const t = useTranslation();

  if (!inboxMessage) {
    return <>Message Information could not be read!</>;
  }

  const dateTime = getDatetime(inboxMessage, schema.dateSent);
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
        {t("_.from")}: {getUrl(inboxMessage, schema.sender)}
      </Title>
      <Text type="secondary" style={{ fontWeight: 400 }}>
        {formattedDateTime}
      </Text>
    </>
  );
};
