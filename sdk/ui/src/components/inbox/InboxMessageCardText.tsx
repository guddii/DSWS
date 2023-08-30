import { Typography } from "antd";
import { getStringNoLocale, schema } from "solid";
import { InboxMessage } from "./InboxMessageCard";
import { useTranslation } from "i18n/client";

const { Paragraph } = Typography;

interface IInboxMessageCardTextProperties {
  inboxMessage?: InboxMessage;
}

export const InboxMessageCardText = ({
  inboxMessage,
}: IInboxMessageCardTextProperties) => {
  const t = useTranslation();

  if (!inboxMessage) {
    return <Paragraph>{t("_.empty")}</Paragraph>;
  }

  return <Paragraph>{getStringNoLocale(inboxMessage, schema.text)}</Paragraph>;
};
