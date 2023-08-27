import { useSession } from "@inrupt/solid-ui-react";
import { Button, Card, Skeleton, App } from "antd";
import { useCallback, useState } from "react";
import {
  SolidDataset,
  Thing,
  UrlString,
  WithServerResourceInfo,
  deleteSolidDataset,
  getSolidDataset,
  getUrl,
  schema,
} from "solid";
import useSWR, { useSWRConfig } from "swr";
import { LoadingFailedFullbleed } from "../Loading";
import { InboxMessageCardHeader } from "./InboxMessageCardHeader";
import { InboxMessageCardText } from "./InboxMessageCardText";
import { InboxMessageCardRaw } from "./InboxMessageCardRaw";
import { InboxMessageCardActionButton } from "./InboxMessageCardActionButton";
import { ModalDeleteMessageFromInbox } from "../modals/ModalDeleteMessageFromInbox";
import { useTranslation } from "i18n/client";
import {
  getInboxMessageContent,
  getInboxMessageHeader,
} from "../../helper/inboxMessage";

export type InboxMessage = SolidDataset & WithServerResourceInfo;
export type InboxMessageHeader = Thing;
export type InboxMessageContent = Thing;

interface IInboxMessageData {
  inboxMessageHeader?: InboxMessageHeader;
  inboxMessageContent?: InboxMessageContent;
}

interface IInboxMessageCardProperties {
  inboxMessageUrl: UrlString;
  inboxUrl: UrlString;
}

export const InboxMessageCard = ({
  inboxMessageUrl,
  inboxUrl,
}: IInboxMessageCardProperties) => {
  const t = useTranslation();
  const { message } = App.useApp();
  const { session } = useSession();
  const { mutate } = useSWRConfig();
  const [openRawMessage, setOpenRawMessage] = useState<boolean>(false);
  const [openDeleteMessage, setOpenDeleteMessage] = useState<boolean>(false);

  /**
   * Gets the meta information and content of the given message.
   * @param url message url
   * @returns message meta info and content
   */
  const getMessage = useCallback(
    async ({ url }: { url: UrlString }): Promise<IInboxMessageData> => {
      const inboxMessageData: IInboxMessageData = {};

      const inboxMessage = await getSolidDataset(url, {
        fetch: session.fetch,
      });

      const inboxMessageHeader = getInboxMessageHeader(inboxMessage);
      if (!inboxMessageHeader) {
        return inboxMessageData;
      }
      inboxMessageData.inboxMessageHeader = inboxMessageHeader;

      const inboxMessageObject = getUrl(inboxMessageHeader, schema.object);
      if (!inboxMessageObject) {
        return inboxMessageData;
      }

      const inboxMessageContent = getInboxMessageContent(
        inboxMessage,
        inboxMessageObject
      );
      if (inboxMessageContent) {
        inboxMessageData.inboxMessageContent = inboxMessageContent;
      }

      return inboxMessageData;
    },
    [session.fetch]
  );

  const {
    data: inboxMessageData,
    error,
    isLoading,
  } = useSWR<IInboxMessageData>(
    { url: inboxMessageUrl, variant: "solid" },
    getMessage
  );

  const deleteMessage = async () => {
    try {
      await deleteSolidDataset(inboxMessageUrl, { fetch: session.fetch });
      mutate(inboxUrl);
    } catch (error: any) {
      console.error(error);
      message.error(error.message || t("_.errorMessage"));
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

  if (isLoading || !inboxMessageData) {
    return (
      <Card
        headStyle={{ paddingTop: 16, paddingBottom: 16 }}
        loading={true}
        title={<Skeleton paragraph={false} active />}
      />
    );
  }

  return (
    <Card
      headStyle={{ paddingTop: 16, paddingBottom: 16 }}
      title={
        <InboxMessageCardHeader
          inboxMessageHeader={inboxMessageData?.inboxMessageHeader}
        />
      }
      actions={[
        <Button
          key="show-raw-button"
          onClick={() => setOpenRawMessage((previous) => !previous)}
          disabled={isLoading}
        >
          {t("_.rawMessage")}
        </Button>,
        <InboxMessageCardActionButton
          key="action-button"
          inboxMessageHeader={inboxMessageData?.inboxMessageHeader}
          inboxMessageContent={inboxMessageData?.inboxMessageContent}
          disabled={isLoading}
          onSuccess={() => setOpenDeleteMessage(true)}
        />,
        <Button
          key="delete-button"
          danger
          onClick={() => setOpenDeleteMessage(true)}
          disabled={isLoading}
        >
          {t("_.delete")}
        </Button>,
      ]}
    >
      <InboxMessageCardText
        inboxMessageHeader={inboxMessageData?.inboxMessageHeader}
      />
      {/* TODO: add a display of the data to allow the user to actually see what
        they write into their data or what they grant access to */}
      {openRawMessage && (
        <InboxMessageCardRaw inboxMessageUrl={inboxMessageUrl} />
      )}
      <ModalDeleteMessageFromInbox
        open={openDeleteMessage}
        onSubmit={deleteMessage}
        onCancel={() => setOpenDeleteMessage(false)}
      />
    </Card>
  );
};
