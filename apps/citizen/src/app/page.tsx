"use client";
import { SessionContent, ControlsStorage, EditorTurtle } from "ui";

export default function Page() {
  return (
    <SessionContent>
      <ControlsStorage>
        <EditorTurtle subject="#me" />
      </ControlsStorage>
    </SessionContent>
  );
}
