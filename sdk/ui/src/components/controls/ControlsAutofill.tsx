"use client";
import { Divider, FormInstance, Space } from "antd";
import { SessionContent } from "../SessionContent";
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
  form?: FormInstance;
}
export const ControlsAutofill = ({ form }: IControlsAutofillProperties) => {
  return (
    <SessionContent alwaysShowChildren>
      <ControlButtons form={form} />
      <Divider plain />
    </SessionContent>
  );
};
