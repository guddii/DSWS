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
      <CardEditorExtraButton href="https://showcase-solid-construction-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentBusinessPremisesPermit) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-environmental-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentCreditNotice) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-reconstruction-loan-corporation.vercel.app/" />
    );
  }
  if (model instanceof AttachmentFundingNotice) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-employment-agency.vercel.app/" />
    );
  }
  if (model instanceof AttachmentIdentityCard) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-registration-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentLicensePlateNumber) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-vehicle-registration-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentVehicleInsurance) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-car-insurance-company.vercel.app/" />
    );
  }
  if (model instanceof AttachmentParentalBenefitNotice) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-parental-benefits-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentPropertyData) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-land-registry-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentTaxDeclaration) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-tax-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentTradeID) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-trade-office.vercel.app/" />
    );
  }
  if (model instanceof AttachmentVehicleRegistration) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-customs.vercel.app/" />
    );
  }
  if (model instanceof MainForm) {
    return (
      <CardEditorExtraButton href="https://showcase-solid-citizen.vercel.app/" />
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
