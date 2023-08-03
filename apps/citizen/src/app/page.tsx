"use client";
import { Divider } from "antd";
import { SessionContent, ControlsStorage, EditorTurtle } from "ui";

export default function Page() {
  return (
    <>
      <Divider>Stammdaten</Divider>
      <SessionContent>
        <ControlsStorage>
          <EditorTurtle subject="#me" />
        </ControlsStorage>
      </SessionContent>
    </>
  );
}
