"use client";
import { AbstractModel } from "solid";
import { ReactNode } from "react";
import { LoaderResource } from "../loader/LoaderResource";
import { EditorTurtleSource } from "./EditorTurtleSource";
import { EditorTurtleModel } from "./EditorTurtleModel";

interface IEditorTurtleProperties {
  source?: string;
  model?: AbstractModel;
  subject?: string;
  children?: ReactNode;
}

export const EditorTurtle = ({
  source,
  model,
  subject,
  children,
}: IEditorTurtleProperties) => {
  if (source && subject) {
    return (
      <LoaderResource dataset={source} subject={subject}>
        <EditorTurtleSource subject={subject} />
      </LoaderResource>
    );
  }

  if (model) {
    return <EditorTurtleModel model={model}>{children}</EditorTurtleModel>;
  }

  return null;
};
