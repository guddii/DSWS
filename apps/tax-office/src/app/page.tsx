"use client";
import { SessionContent, ControlsAutofill, EditorTurtle } from "ui";
import { TaxOfficeModel } from "solid";
import { Divider } from "antd";

export default function Page() {
  return (
    <>
      <Divider>Steuererklärung</Divider>
      <SessionContent alwaysShowChildren>
        <EditorTurtle model={TaxOfficeModel.create({ subject: "#me" })}>
          <ControlsAutofill />
        </EditorTurtle>
      </SessionContent>
    </>
  );
}
