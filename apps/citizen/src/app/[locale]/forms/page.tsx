"use client";
import { MAINDATA_FILE_PATH } from "solid";
import {
  SessionContent,
  EditorTurtle,
  PageProvider,
  FolderStructureVerification,
  ControlsDataset,
  usePage,
  LayoutContent,
  useIdentity,
} from "ui";
import { Card } from "antd";
import { useTranslation } from "i18n/client";

const EditorTurtleWithPageDataset = () => {
  const { dataset } = usePage();
  const { webId } = useIdentity();

  if (!webId) {
    console.error("WebId is not available.");
  }

  return <EditorTurtle dataset={dataset} subject={webId} />;
};

export default function Page() {
  const t = useTranslation();

  const currentItem = {
    title: t("_.maindata"),
    key: "maindata",
  };

  const breadcrumbItems = [
    {
      title: t("_.forms"),
      key: "forms",
    },
    currentItem,
  ];

  return (
    <SessionContent>
      <PageProvider>
        <FolderStructureVerification>
          <LayoutContent
            options={{ breadcrumbItems, currentItem }}
            extra={
              <ControlsDataset
                datasetPath={MAINDATA_FILE_PATH}
                enableInitialLoading
                buttonLabel={t("_.reload")}
              />
            }
          >
            <Card title={t("_.maindata")}>
              <EditorTurtleWithPageDataset />
            </Card>
          </LayoutContent>
        </FolderStructureVerification>
      </PageProvider>
    </SessionContent>
  );
}
