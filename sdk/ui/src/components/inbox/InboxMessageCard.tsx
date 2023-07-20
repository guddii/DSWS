import { useSession } from "@inrupt/solid-ui-react";
import { Card, Divider, Space, Typography } from "antd";
import { useCallback } from "react";
import {
  Thing,
  UrlString,
  createUrl,
  getDatetime,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  toUrlString,
} from "solid";
import useSWR from "swr";
import { LoadingFailedFullbleed } from "../Loading";
import { useIdentity } from "../../contexts/IdentityContext";

const { Text, Title, Paragraph } = Typography;

interface IInboxMessageCardProperties {
  messageUrl: UrlString;
  inboxUrl: UrlString;
}

interface IMessage {
  message: Thing | null;
  content: Thing | null;
}

interface IInboxMessageCardContentProperties {
  data?: IMessage;
}

const InboxMessageCardContent = ({
  data,
}: IInboxMessageCardContentProperties) => {
  if (!data || !data.message || !data.content) {
    return null;
  }
  console.log(data);

  const dateTime = getDatetime(data.message, "http://schema.org/dateSent");
  let formattedDateTime = "";
  if (dateTime) {
    formattedDateTime = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeStyle: "long",
    }).format(dateTime);
  }

  return (
    <Typography>
      <Title level={5}>
        From: {getUrl(data.message, "http://schema.org/sender")}
      </Title>
      <Text type="secondary">{formattedDateTime}</Text>
      <Divider />
      <Paragraph>
        {getStringNoLocale(data.message, "http://schema.org/text")}
      </Paragraph>
      <Paragraph>
        {getUrl(data.content, "http://schema.org/subjectOf")}
      </Paragraph>
    </Typography>
  );
};

export const InboxMessageCard = ({
  messageUrl,
  inboxUrl,
}: IInboxMessageCardProperties) => {
  const { session } = useSession();
  const { webId } = useIdentity();

  /**
   * Gets the meta information and content of the given message.
   * @param url message url
   * @returns message meta info and content
   */
  const getMessage = useCallback(
    async (url: UrlString): Promise<IMessage> => {
      const dataset = await getSolidDataset(url, {
        fetch: session.fetch,
      });

      const messageInfoUrl = toUrlString(createUrl("message", inboxUrl));
      const message = getThing(dataset, messageInfoUrl);

      const content = getThing(dataset, webId);

      return { message, content };
    },
    [inboxUrl, session.fetch, webId]
  );

  const { data, error, isLoading } = useSWR<IMessage>(messageUrl, getMessage);

  if (error) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }
  if (!messageUrl) {
    console.error("messageUrl missing");
    return null;
  }

  return (
    <Card style={{ width: 600 }} loading={isLoading}>
      <InboxMessageCardContent data={data} />
    </Card>
  );
};
