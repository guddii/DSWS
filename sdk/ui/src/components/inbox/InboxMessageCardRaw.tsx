import { useSession } from "@inrupt/solid-ui-react";
import { Divider, Space, Typography } from "antd";
import { useCallback } from "react";
import { UrlString } from "solid";
import useSWR from "swr";
import { Loading, LoadingFailed } from "../Loading";
import { useTranslation } from "i18n/client";

const { Paragraph } = Typography;

interface IInboxMessageCardRawProperties {
  inboxMessageUrl: UrlString;
}

const InboxMessageCardRawTitle = () => {
  const t = useTranslation();
  return (
    <Divider plain>
      {t("sdk.ui.components.inbox.InboxMessageCardRawTitle")}
    </Divider>
  );
};

export const InboxMessageCardRaw = ({
  inboxMessageUrl,
}: IInboxMessageCardRawProperties) => {
  const t = useTranslation();
  const { session } = useSession();

  /**
   * Gets the raw turtle data of the given message.
   * @param url message url
   * @returns raw turtle data string
   */
  const getRawMessage = useCallback(
    async ({ url }: { url: UrlString }): Promise<string> => {
      const res = await session.fetch(url);

      return await res.text();
    },
    [session]
  );

  const { data, error, isLoading } = useSWR<string>(
    { url: inboxMessageUrl, variant: "raw" },
    getRawMessage
  );

  if (isLoading)
    return (
      <>
        <InboxMessageCardRawTitle />
        <Space align="center" direction="vertical" style={{ width: "100%" }}>
          <Loading />
        </Space>
      </>
    );
  if (error) {
    console.error(error);
    return (
      <>
        <InboxMessageCardRawTitle />
        <Space align="center" direction="vertical" style={{ width: "100%" }}>
          <LoadingFailed />
          <Paragraph>
            {t("sdk.ui.components.inbox.InboxMessageCardRaw")}
          </Paragraph>
        </Space>
      </>
    );
  }

  return (
    <>
      <InboxMessageCardRawTitle />
      <Paragraph>
        <pre>{data}</pre>
      </Paragraph>
    </>
  );
};
