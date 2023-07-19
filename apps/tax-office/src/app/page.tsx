"use client";
import { SessionContent, ControlsAutofill, EditorTurtle } from "ui";
import { TaxOfficeModel } from "solid";

export default function Page() {
  return (
    <SessionContent alwaysShowChildren>
      <EditorTurtle model={TaxOfficeModel.create({ subject: "#me" })}>
        <ControlsAutofill />
      </EditorTurtle>
    </SessionContent>
  );
}
