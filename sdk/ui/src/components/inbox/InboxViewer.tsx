"use client";
import { useSession } from "@inrupt/solid-ui-react";
import { useCallback } from "react";
import {
  INBOX_FOLDER_PATH,
  LDP,
  createUrl,
  getSolidDataset,
  getUrlAll,
  getThing,
  toUrlString,
  UrlString,
} from "solid";
import useSWR from "swr";
import { LoadingFailedFullbleed, LoadingFullbleed } from "../Loading";
import { Empty, Space } from "antd";
import { InboxMessageCard } from "./InboxMessageCard";
import { useIdentity } from "../../contexts/IdentityContext";

export const InboxViewer = () => {
  const { session } = useSession();
  const { storage } = useIdentity();
  const inboxUrl: UrlString | null = storage
    ? toUrlString(createUrl(INBOX_FOLDER_PATH, storage))
    : null;

  /**
   * Gets a list of all entries inside the given inbox folder.
   * @param url inbox url
   * @returns array of entries inside inbox
   */
  const getInboxEntries = useCallback(
    async (url: UrlString) => {
      const dataset = await getSolidDataset(url, {
        fetch: session.fetch,
      });

      const thing = getThing(dataset, url);

      if (thing) {
        const messages = getUrlAll(thing, LDP.contains.iri.value);
        return messages.map((message) => toUrlString(message));
      }

      return [];
    },
    [session.fetch]
  );

  const { data, error, isLoading } = useSWR<Array<UrlString> | null>(
    inboxUrl,
    getInboxEntries
  );

  if (isLoading) return <LoadingFullbleed />;
  if (error) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }
  if (!storage || !inboxUrl) {
    console.error("storage missing");
    return <LoadingFailedFullbleed />;
  }

  if (!data || data.length === 0) {
    return (
      <Empty description={"Your inbox is empty."} style={{ marginTop: 50 }} />
    );
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {data?.map((messageUrl) => (
        <InboxMessageCard
          key={messageUrl}
          messageUrl={messageUrl}
          inboxUrl={inboxUrl}
        />
      ))}
    </Space>
  );
};
