"use client";
import { AbstractModel } from "solid";
import { ReactNode } from "react";
import { EditorTurtleDataset } from "./EditorTurtleDataset";
import { EditorTurtleModel } from "./EditorTurtleModel";
import { Dataset } from "../../contexts/PageContext";

interface IEditorTurtleProperties {
  dataset?: Dataset;
  model?: AbstractModel;
  subject?: string;
  children?: ReactNode;
  form?: any;
}

export const EditorTurtle = ({
  dataset,
  model,
  subject,
  children,
  form,
}: IEditorTurtleProperties) => {
  if (dataset && subject) {
    return <EditorTurtleDataset dataset={dataset} subject={subject} />;
  }

  if (model) {
    return (
      <EditorTurtleModel model={model} form={form}>
        {children}
      </EditorTurtleModel>
    );
  }

  return null;
};
