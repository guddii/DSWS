import { useSession } from "@inrupt/solid-ui-react";
import { Button, Card, Skeleton, message } from "antd";
import { useCallback, useState } from "react";
import {
  Thing,
  UrlString,
  deleteSolidDataset,
  getSolidDataset,
  getThing,
} from "solid";
import useSWR, { useSWRConfig } from "swr";
import { LoadingFailedFullbleed } from "../Loading";
import { useIdentity } from "../../contexts/IdentityContext";
import { InboxMessageCardHeader } from "./InboxMessageCardHeader";
import { InboxMessageCardText } from "./InboxMessageCardText";
import { InboxMessageCardContent } from "./InboxMessageCardContent";
import { InboxMessageCardRaw } from "./InboxMessageCardRaw";
import { InboxMessageCardSaveButton } from "./InboxMessageCardSaveButton";

export type Message = Thing;
export type Content = Thing;

interface IMessageData {
  message?: Message;
  content?: Content;
}

interface IInboxMessageCardProperties {
  messageUrl: UrlString;
  inboxUrl: UrlString;
}

export const InboxMessageCard = ({
  messageUrl,
  inboxUrl,
}: IInboxMessageCardProperties) => {
  const { session } = useSession();
  const { webId } = useIdentity();
  const { mutate } = useSWRConfig();
  const [openRawMessage, setOpenRawMessage] = useState<boolean>(false);

  /**
   * Gets the meta information and content of the given message.
   * @param url message url
   * @returns message meta info and content
   */
  const getMessage = useCallback(
    async ({
      url,
      webId,
    }: {
      url: UrlString;
      webId: string;
    }): Promise<IMessageData> => {
      const dataset = await getSolidDataset(url, {
        fetch: session.fetch,
      });

      const message = getThing(dataset, url);
      const content = getThing(dataset, webId);

      return {
        message: message ?? undefined,
        content: content ?? undefined,
      };
    },
    [session.fetch]
  );

  const { data, error, isLoading } = useSWR<IMessageData>(
    { url: messageUrl, webId },
    getMessage
  );

  const deleteMessage = async () => {
    try {
      await deleteSolidDataset(messageUrl, { fetch: session.fetch });
      mutate(inboxUrl);
      message.success("Successfully deleted message");
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while deleting message");
    }
  };

  if (error) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }
  if (!messageUrl) {
    console.error("messageUrl missing");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: openRawMessage ? 900 : 600,
          width: "100%",
        }}
        headStyle={{ paddingTop: 16, paddingBottom: 16 }}
        loading={isLoading}
        title={
          isLoading ? (
            <Skeleton paragraph={false} active />
          ) : (
            <InboxMessageCardHeader message={data?.message} />
          )
        }
        actions={[
          <Button
            key="show-raw-button"
            onClick={() => setOpenRawMessage((previous) => !previous)}
            disabled={isLoading}
          >
            Raw Message
          </Button>,
          <InboxMessageCardSaveButton
            key="save-data-button"
            message={data?.message}
            content={data?.content}
            disabled={isLoading}
          />,
          <Button
            key="delete-button"
            danger
            onClick={deleteMessage}
            disabled={isLoading}
          >
            Delete
          </Button>,
        ]}
      >
        <InboxMessageCardText message={data?.message} />
        <InboxMessageCardContent content={data?.content} />
        {openRawMessage && <InboxMessageCardRaw url={messageUrl} />}
      </Card>
    </div>
  );
};
