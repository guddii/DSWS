import { useSession } from "@inrupt/solid-ui-react";
import { Divider, Space, Typography } from "antd";
import { useCallback } from "react";
import { UrlString } from "solid";
import useSWR from "swr";
import { Loading, LoadingFailed } from "../Loading";

const { Paragraph } = Typography;

interface IInboxMessageCardRawProperties {
  url: UrlString;
}

const InboxMessageCardRawTitle = () => (
  <Divider plain>Raw Turtle Message </Divider>
);

export const InboxMessageCardRaw = ({
  url,
}: IInboxMessageCardRawProperties) => {
  const { session } = useSession();

  /**
   * Gets the raw turtle data of the given message.
   * @param url message url
   * @returns raw turtle data string
   */
  const getRawMessage = useCallback(
    async (url: UrlString): Promise<string> => {
      const res = await session.fetch(url);

      return await res.text();
    },
    [session]
  );

  const { data, error, isLoading } = useSWR<string>(url, getRawMessage);

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
          <Paragraph>Loading raw data failed.</Paragraph>
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
