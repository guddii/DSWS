"use client";
import { AbstractModel } from "solid";
import { ReactNode } from "react";
import { ResourceLoader } from "../loader/ResourceLoader";
import { SourceTurtleEditor } from "./SourceTurtleEditor";
import { ModelTurtleEditor } from "./ModelTurtleEditor";

interface ITurtleEditorProperties {
  source?: string;
  model?: AbstractModel;
  subject?: string;
  children?: ReactNode;
}

export const TurtleEditor = ({
  source,
  model,
  subject,
  children,
}: ITurtleEditorProperties) => {
  if (source && subject) {
    return (
      <ResourceLoader dataset={source} subject={subject}>
        <SourceTurtleEditor subject={subject} />
      </ResourceLoader>
    );
  }

  if (model) {
    return <ModelTurtleEditor model={model}>{children}</ModelTurtleEditor>;
  }

  return null;
};
