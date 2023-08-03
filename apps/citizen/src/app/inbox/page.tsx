"use client";
import { Divider } from "antd";
import { INBOX_FOLDER_PATH } from "solid";
import {
  ControlsDataset,
  FolderStructureVerification,
  InboxViewer,
  PageProvider,
  SessionContent,
} from "ui";

export default function Page() {
  return (
    <>
      <Divider>Inbox</Divider>
      <SessionContent>
        <PageProvider>
          <FolderStructureVerification>
            <ControlsDataset
              datasetPath={INBOX_FOLDER_PATH}
              enableSwrLoading
              buttonLabel="Reload Inbox"
            />
            <InboxViewer />
          </FolderStructureVerification>
        </PageProvider>
      </SessionContent>
    </>
  );
}
