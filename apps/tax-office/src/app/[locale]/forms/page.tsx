"use client";
import {
  SessionContent,
  ControlsAutofill,
  EditorTurtle,
  LayoutContent,
} from "ui";
import { TaxOfficeModel } from "solid";
import { Card, Form } from "antd";
import { useTranslation } from "i18n/client";

export default function Page() {
  const [form] = Form.useForm();
  const t = useTranslation();

  const currentItem = {
    title: t("_.form.propertyTaxReturn"),
    key: "propertyTaxReturn",
  };

  const breadcrumbItems = [
    {
      title: t("_.forms"),
      key: "forms",
    },
    currentItem,
  ];
  return (
    <SessionContent alwaysShowChildren>
      <LayoutContent options={{ breadcrumbItems, currentItem }}>
        <Card title={t("_.mainForm")} extra={<ControlsAutofill form={form} />}>
          <EditorTurtle
            form={form}
            model={TaxOfficeModel.create()}
          ></EditorTurtle>
        </Card>
      </LayoutContent>
    </SessionContent>
  );
}
