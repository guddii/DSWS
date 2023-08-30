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
import { useTranslation } from "i18n/client";

export default function Page() {
  const t = useTranslation();
  const currentItem = {
    title: t("_.inbox"),
    key: "inbox",
  };

  const breadcrumbItems = [currentItem];

  return (
    <SessionContent>
      <PageProvider>
        <FolderStructureVerification>
          <LayoutContent
            options={{ breadcrumbItems, currentItem }}
            extra={
              <ControlsDataset
                datasetPath={INBOX_FOLDER_PATH}
                enableSwrLoading
                buttonLabel={t("_.reload")}
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
