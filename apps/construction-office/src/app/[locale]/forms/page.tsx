"use client";
import {
  SessionContent,
  ControlsAutofill,
  LayoutContent,
  CardEditor,
} from "ui";
import {
  AttachmentPropertyData,
  AttachmentTradeID,
  AttachmentTradeIDFactoryConfiguration,
  MainForm,
} from "solid";
import { Form } from "antd";
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
        <CardEditor
          title={t("_.mainForm")}
          form={form}
          model={MainForm.create()}
        />
        <br />
        <CardEditor
          title={t("_.attachment", t(GOV.TradeLicence.value as I18nKey))}
          form={form}
          model={AttachmentTradeID.create(
            AttachmentTradeIDFactoryConfiguration.AS_OPTIONAL
          )}
        />
        <br />
        <CardEditor
          title={t("_.attachment", t(GOV.PropertyData.value as I18nKey))}
          form={form}
          model={AttachmentPropertyData.create()}
        />
      </LayoutContent>
    </SessionContent>
  );
}
