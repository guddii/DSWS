"use client";
import {
  SessionContent,
  ControlsAutofill,
  EditorTurtle,
  LayoutContent,
} from "ui";
import { GOV, TaxOfficeModel } from "solid";
import { Card, Form } from "antd";
import { I18nKey, useTranslation } from "i18n/client";
import { AttachmentPropertyDataModel } from "solid/src/models/AttachmentPropertyDataModel";

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
      <LayoutContent
        options={{ breadcrumbItems, currentItem }}
        extra={<ControlsAutofill form={form} />}
      >
        <Card title={t("_.mainForm")}>
          <EditorTurtle
            form={form}
            model={TaxOfficeModel.create()}
          ></EditorTurtle>
        </Card>
        <br />
        <Card title={t("_.attachment", t(GOV.PropertyData.value as I18nKey))}>
          <EditorTurtle
            form={form}
            model={AttachmentPropertyDataModel.create()}
          ></EditorTurtle>
        </Card>
      </LayoutContent>
    </SessionContent>
  );
}
