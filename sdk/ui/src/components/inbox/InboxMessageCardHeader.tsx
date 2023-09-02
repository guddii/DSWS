import { Typography } from "antd";
import { getDatetime, getUrl, schema } from "solid";
import { InboxMessageHeader } from "./InboxMessageCard";
import { useTranslation } from "i18n/client";

const { Text, Title } = Typography;

interface IInboxMessageCardHeaderProperties {
  inboxMessageHeader?: InboxMessageHeader;
}

export const InboxMessageCardHeader = ({
  inboxMessageHeader,
}: IInboxMessageCardHeaderProperties) => {
  const t = useTranslation();

  if (!inboxMessageHeader) {
    return <>Message Information could not be read!</>;
  }

  const dateTime = getDatetime(inboxMessageHeader, schema.dateSent);
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
        {t("_.from")}: {getUrl(inboxMessageHeader, schema.sender)}
      </Title>
      <Text type="secondary" style={{ fontWeight: 400 }}>
        {formattedDateTime}
      </Text>
    </>
  );
};
