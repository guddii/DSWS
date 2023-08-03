"use client";
import { Divider } from "antd";
import { STAMMDATEN_FILE_PATH } from "solid";
import {
  SessionContent,
  EditorTurtle,
  PageProvider,
  FolderStructureVerification,
  ControlsDataset,
  usePage,
} from "ui";

const EditorTurtleWithPageDataset = () => {
  const { dataset } = usePage();

  return <EditorTurtle dataset={dataset} subject="#me" />;
};

export default function Page() {
  return (
    <>
      <Divider>Stammdaten</Divider>
      <SessionContent>
        <PageProvider>
          <FolderStructureVerification>
            <ControlsDataset
              datasetPath={STAMMDATEN_FILE_PATH}
              enableInitialLoading
              buttonLabel="Reload Stammdaten"
            />
            <EditorTurtleWithPageDataset />
          </FolderStructureVerification>
        </PageProvider>
      </SessionContent>
    </>
  );
}
