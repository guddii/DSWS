"use client";
import { EditorTurtle } from "../editor/EditorTurtle";
import { Button, Card } from "antd";
import {
  AttachmentBuildingPermit,
  AttachmentBusinessPremisesPermit,
  AttachmentCreditNotice,
  AttachmentFundingNotice,
  AttachmentIdentityCard,
  AttachmentLicensePlateNumber,
  AttachmentVehicleInsurance,
  AttachmentParentalBenefitNotice,
  AttachmentPropertyData,
  AttachmentTaxDeclaration,
  AttachmentTradeID,
  AttachmentVehicleRegistration,
  MainForm,
} from "solid";
import { AuditOutlined } from "@ant-design/icons";

interface ICardEditorExtraButtonProperties {
  href: string;
}

const CardEditorExtraButton = ({ href }: ICardEditorExtraButtonProperties) => {
  return (
    <Button
      type="text"
      icon={<AuditOutlined rev={"AuditOutlined"} />}
      href={href}
      target="_blank"
    />
  );
};

interface ICardEditorExtraProperties {
  model: any;
}

const CardEditorExtra = ({ model }: ICardEditorExtraProperties) => {
  if (model instanceof AttachmentBuildingPermit) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-construction-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentBusinessPremisesPermit) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-environmental-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentCreditNotice) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-reconstruction-loan-corporation.vercel.app/" />
    );
  }
  if (model instanceof AttachmentFundingNotice) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-employment-agency.vercel.app/" />
    );
  }
  if (model instanceof AttachmentIdentityCard) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-registration-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentLicensePlateNumber) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-vehicle-registration-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentVehicleInsurance) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-car-insurance-company.vercel.app/" />
    );
  }
  if (model instanceof AttachmentParentalBenefitNotice) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-parental-benefits-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentPropertyData) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-land-registry-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentTaxDeclaration) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-tax-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentTradeID) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-trade-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentVehicleRegistration) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-customs.vercel.app/" />
    );
  }
  if (model instanceof MainForm) {
    return (
      <CardEditorExtraButton href="https://solid-showcase-citizen.vercel.app/" />
    );
  }
  return null;
};

interface ICardEditorProperties {
  title: string;
  form: any;
  model: any;
}

export const CardEditor = ({ title, form, model }: ICardEditorProperties) => {
  return (
    <Card title={title} extra={<CardEditorExtra model={model} />}>
      <EditorTurtle form={form} model={model}></EditorTurtle>
    </Card>
  );
};
