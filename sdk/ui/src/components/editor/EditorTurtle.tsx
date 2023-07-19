"use client";
import { AbstractModel } from "solid";
import { ReactNode } from "react";
import { ResourceLoader } from "../loader/ResourceLoader";
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
      <ResourceLoader dataset={source} subject={subject}>
        <EditorTurtleSource subject={subject} />
      </ResourceLoader>
    );
  }

  if (model) {
    return <EditorTurtleModel model={model}>{children}</EditorTurtleModel>;
  }

  return null;
};
