"use client";
import { SessionContent, ControlsAutofill, EditorTurtle } from "ui";
import { LandRegistryOfficeModel } from "solid";
import { Divider } from "antd";

export default function Page() {
  return (
    <>
      <Divider>Vermessungsdaten</Divider>
      <SessionContent alwaysShowChildren>
        <EditorTurtle
          model={LandRegistryOfficeModel.create({ subject: "#me" })}
        >
          <ControlsAutofill />
        </EditorTurtle>
      </SessionContent>
    </>
  );
}
