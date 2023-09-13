"use client";
import {
  SessionContent,
  ControlsAutofill,
  LayoutContent,
  CardEditor,
} from "ui";
import {
  AttachmentCreditNotice,
  AttachmentCreditNoticeFactoryConfiguration,
  AttachmentIdentityCard,
  AttachmentMotorVehicleInsuranceCertificate,
  AttachmentMotorVehicleInsuranceCertificateFactoryConfiguration,
  MainForm,
  MainFormFactoryConfiguration,
} from "solid";
import { Form } from "antd";
import { I18nKey, useTranslation } from "i18n/client";
import { GOV } from "vocab";

export default function Page() {
  const [form] = Form.useForm();
  const t = useTranslation();

  const currentItem = {
    title: t(GOV.TradeLicence.value as I18nKey),
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
          model={MainForm.create(MainFormFactoryConfiguration.WITH_LOCALITY)}
        />
        <br />
        <CardEditor
          title={t("_.attachment", t(GOV.IdentityCard.value as I18nKey))}
          form={form}
          model={AttachmentIdentityCard.create()}
        />
        <br />
        <CardEditor
          title={t(
            "_.attachment",
            t(GOV.MotorVehicleInsuranceCertificate.value as I18nKey)
          )}
          form={form}
          model={AttachmentMotorVehicleInsuranceCertificate.create(
            AttachmentMotorVehicleInsuranceCertificateFactoryConfiguration.AS_OPTIONAL
          )}
        />
        <br />
        <CardEditor
          title={t("_.attachment", t(GOV.CreditNotice.value as I18nKey))}
          form={form}
          model={AttachmentCreditNotice.create(
            AttachmentCreditNoticeFactoryConfiguration.AS_OPTIONAL
          )}
        />
      </LayoutContent>
    </SessionContent>
  );
}
