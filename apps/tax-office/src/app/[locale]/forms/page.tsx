"use client";
import {
  SessionContent,
  ControlsAutofill,
  EditorTurtle,
  LayoutContent,
} from "ui";
import {
  AttachmentCreditNotice,
  AttachmentParentalBenefitNotice,
  AttachmentTradeIDFactoryConfiguration,
  AttachmentTradeID,
  MainForm,
  MainFormFactoryConfiguration,
  AttachmentCreditNoticeFactoryConfiguration,
  AttachmentParentalBenefitNoticeFactoryConfiguration,
} from "solid";
import { Card, Form } from "antd";
import { I18nKey, useTranslation } from "i18n/client";
import { AttachmentPropertyData } from "solid/src/models/AttachmentPropertyData";
import { GOV } from "vocab";

export default function Page() {
  const [form] = Form.useForm();
  const t = useTranslation();

  const currentItem = {
    title: t(GOV.TaxDeclaration.value as I18nKey),
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
          <EditorTurtle
            form={form}
            model={MainForm.create(MainFormFactoryConfiguration.WITH_LOCALITY)}
          ></EditorTurtle>
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
        <br />
        <Card title={t("_.attachment", t(GOV.CreditNotice.value as I18nKey))}>
          <EditorTurtle
            form={form}
            model={AttachmentCreditNotice.create(
              AttachmentCreditNoticeFactoryConfiguration.AS_OPTIONAL
            )}
          ></EditorTurtle>
        </Card>
        <br />
        <Card
          title={t(
            "_.attachment",
            t(GOV.ParentalBenefitNotice.value as I18nKey)
          )}
        >
          <EditorTurtle
            form={form}
            model={AttachmentParentalBenefitNotice.create(
              AttachmentParentalBenefitNoticeFactoryConfiguration.AS_OPTIONAL
            )}
          ></EditorTurtle>
        </Card>
      </LayoutContent>
    </SessionContent>
  );
}
