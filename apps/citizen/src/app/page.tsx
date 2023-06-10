"use client";
import { SessionContent, ControlsStorage, TurtleEditor } from "ui";

export default function Page() {
  return (
    <SessionContent>
      <ControlsStorage>
        <TurtleEditor subject="#me" />
      </ControlsStorage>
    </SessionContent>
  );
}
