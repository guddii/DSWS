"use client";
import { Divider } from "antd";
import { InboxViewer, SessionContent } from "ui";

export default function Page() {
  return (
    <SessionContent>
      <Divider>Inbox</Divider>
      <InboxViewer />
    </SessionContent>
  );
}
