"use client";

import { INBOX_FOLDER_PATH } from "solid";
import {
  ControlsDataset,
  FolderStructureVerification,
  InboxViewer,
  PageProvider,
  SessionContent,
  LayoutContent,
} from "ui";

const currentItem = {
  title: "Inbox",
  key: "inbox",
};

const breadcrumbItems = [currentItem];

const metadata = { title: "Citizen" };

export default function Page() {
  return (
    <SessionContent>
      <PageProvider>
        <FolderStructureVerification>
          <LayoutContent
            options={{ breadcrumbItems, currentItem, metadata }}
            extra={
              <ControlsDataset
                datasetPath={INBOX_FOLDER_PATH}
                enableSwrLoading
                buttonLabel="Reload Inbox"
              />
            }
          >
            <InboxViewer />
          </LayoutContent>
        </FolderStructureVerification>
      </PageProvider>
    </SessionContent>
  );
}
