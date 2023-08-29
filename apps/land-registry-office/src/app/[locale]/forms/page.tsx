"use client";
import {
  SessionContent,
  ControlsAutofill,
  EditorTurtle,
  LayoutContent,
} from "ui";
import { LandRegistryOfficeModel } from "solid";
import { Card, Form } from "antd";

const currentItem = {
  title: "Land Register Surveys",
  key: "landRegisterSurveys",
};

const breadcrumbItems = [
  {
    title: "Forms",
    key: "forms",
  },
  currentItem,
];

const metadata = { title: "Land Registry Office" };

export default function Page() {
  const [form] = Form.useForm();

  return (
    <SessionContent alwaysShowChildren>
      <LayoutContent options={{ breadcrumbItems, currentItem, metadata }}>
        <Card title={"Main Form"} extra={<ControlsAutofill form={form} />}>
          <EditorTurtle
            form={form}
            model={LandRegistryOfficeModel.create()}
          ></EditorTurtle>
        </Card>
      </LayoutContent>
    </SessionContent>
  );
}
