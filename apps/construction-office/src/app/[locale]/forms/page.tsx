"use client";
import {
  SessionContent,
  ControlsAutofill,
  EditorTurtle,
  LayoutContent,
} from "ui";
import {
  AttachmentPropertyData,
  AttachmentTradeID,
  AttachmentTradeIDFactoryConfiguration,
  MainForm,
} from "solid";
import { Card, Form } from "antd";
import { I18nKey, useTranslation } from "i18n/client";
import { GOV } from "vocab";

export default function Page() {
  const [form] = Form.useForm();
  const t = useTranslation();

  const currentItem = {
    title: t(GOV.BuildingPermit.value as I18nKey),
    key: "form",
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
          <EditorTurtle form={form} model={MainForm.create()}></EditorTurtle>
        </Card>
        <br />
        <Card title={t("_.attachment", t(GOV.TradeLicence.value as I18nKey))}>
          <EditorTurtle
            form={form}
            model={AttachmentTradeID.create(
              AttachmentTradeIDFactoryConfiguration.AS_OPTIONAL
            )}
          ></EditorTurtle>
        </Card>
        <br />
        <Card title={t("_.attachment", t(GOV.PropertyData.value as I18nKey))}>
          <EditorTurtle
            form={form}
            model={AttachmentPropertyData.create()}
          ></EditorTurtle>
        </Card>
      </LayoutContent>
    </SessionContent>
  );
}
