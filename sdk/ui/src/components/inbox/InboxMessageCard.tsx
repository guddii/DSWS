import { useSession } from "@inrupt/solid-ui-react";
import { Button, Card, Skeleton, App } from "antd";
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
import { ModalDeleteMessageFromInbox } from "../modals/ModalDeleteMessageFromInbox";

export type InboxMessage = Thing;
export type InboxContent = Thing;

interface IMessageData {
  inboxMessage?: InboxMessage;
  inboxContent?: InboxContent;
}

interface IInboxMessageCardProperties {
  inboxMessageUrl: UrlString;
  inboxUrl: UrlString;
}

export const InboxMessageCard = ({
  inboxMessageUrl,
  inboxUrl,
}: IInboxMessageCardProperties) => {
  const { message } = App.useApp();
  const { session } = useSession();
  const { webId } = useIdentity();
  const { mutate } = useSWRConfig();
  const [openRawMessage, setOpenRawMessage] = useState<boolean>(false);
  const [openDeleteMessage, setOpenDeleteMessage] = useState<boolean>(false);

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

      const inboxMessage = getThing(dataset, url);
      const inboxContent = getThing(dataset, webId);

      return {
        inboxMessage: inboxMessage ?? undefined,
        inboxContent: inboxContent ?? undefined,
      };
    },
    [session.fetch]
  );

  const { data, error, isLoading } = useSWR<IMessageData>(
    { url: inboxMessageUrl, webId },
    getMessage
  );

  const deleteMessage = async () => {
    try {
      await deleteSolidDataset(inboxMessageUrl, { fetch: session.fetch });
      mutate(inboxUrl);
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while deleting message");
    }
  };

  if (error) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }
  if (!inboxMessageUrl) {
    console.error("inboxMessageUrl missing");
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
        style={{ width: "100%" }}
        headStyle={{ paddingTop: 16, paddingBottom: 16 }}
        loading={isLoading}
        title={
          isLoading ? (
            <Skeleton paragraph={false} active />
          ) : (
            <InboxMessageCardHeader inboxMessage={data?.inboxMessage} />
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
            inboxMessage={data?.inboxMessage}
            inboxContent={data?.inboxContent}
            disabled={isLoading}
            onSuccess={() => setOpenDeleteMessage(true)}
          />,
          <Button
            key="delete-button"
            danger
            onClick={() => setOpenDeleteMessage(true)}
            disabled={isLoading}
          >
            Delete
          </Button>,
        ]}
      >
        <InboxMessageCardText inboxMessage={data?.inboxMessage} />
        <InboxMessageCardContent inboxContent={data?.inboxContent} />
        {openRawMessage && (
          <InboxMessageCardRaw inboxMessageUrl={inboxMessageUrl} />
        )}
        <ModalDeleteMessageFromInbox
          open={openDeleteMessage}
          onSubmit={deleteMessage}
          onCancel={() => setOpenDeleteMessage(false)}
        />
      </Card>
    </div>
  );
};
