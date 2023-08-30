"use client";
import { useCallback, useMemo } from "react";
import { LDP, getUrlAll, getThing, toUrlString } from "solid";
import { LoadingFailedFullbleed } from "../Loading";
import { Empty, Space } from "antd";
import { InboxMessageCard } from "./InboxMessageCard";
import { usePage } from "../../contexts/PageContext";
import { useTranslation } from "i18n/client";

export const InboxViewer = () => {
  const t = useTranslation();
  const { dataset } = usePage();
  const inboxUrl = dataset?.internal_resourceInfo.sourceIri;

  /**
   * Gets a list of all entries inside the given inbox folder.
   * @param url inbox url
   * @returns array of entries inside inbox
   */
  const getInboxEntries = useCallback(() => {
    if (dataset && inboxUrl) {
      const thing = getThing(dataset, inboxUrl);

      if (thing) {
        const inboxMessages = getUrlAll(thing, LDP.contains.iri.value);
        return inboxMessages.map((inboxMessageUrl) =>
          toUrlString(inboxMessageUrl)
        );
      }
      return [];
    }

    return undefined;
  }, [dataset, inboxUrl]);

  const data = useMemo(getInboxEntries, [getInboxEntries]);

  if (!dataset || !inboxUrl) return null;
  if (data === undefined) return <LoadingFailedFullbleed />;

  if (data.length === 0) {
    return <Empty description={t("_.empty")} style={{ marginTop: 50 }} />;
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {data.map((inboxMessageUrl) => (
        <InboxMessageCard
          key={inboxMessageUrl}
          inboxMessageUrl={inboxMessageUrl}
          inboxUrl={inboxUrl}
        />
      ))}
    </Space>
  );
};
