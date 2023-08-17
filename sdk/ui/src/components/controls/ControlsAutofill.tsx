"use client";
import { FormInstance, Space } from "antd";
import { ControlsAutofillWithoutSession } from "./ControlsAutofillWithoutSession";
import { ControlsRevokeAccessGrant } from "./ControlsRevokeAccessGrant";

interface IControlButtonsProperties {
  form?: FormInstance;
}

const ControlButtons = ({ form }: IControlButtonsProperties) => {
  return (
    <Space>
      <ControlsAutofillWithoutSession form={form} />
      <ControlsRevokeAccessGrant />
    </Space>
  );
};

interface IControlsAutofillProperties {
  form: FormInstance;
}
export const ControlsAutofill = ({ form }: IControlsAutofillProperties) => {
  return <ControlButtons form={form} />;
};
