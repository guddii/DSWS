import { Divider, FormInstance, Space } from "antd";
import { SessionContent } from "../SessionContent";
import { ControlsAutofillWithSession } from "./ControlsAutofillWithSession";
import { ControlsAutofillWithoutSession } from "./ControlsAutofillWithoutSession";

interface IControlButtonsProperties {
  storage?: string;
  form?: FormInstance;
}

const ControlButtons = ({ storage, form }: IControlButtonsProperties) => {
  return (
    <Space>
      <ControlsAutofillWithSession storage={storage} form={form} />
      <ControlsAutofillWithoutSession form={form} />
    </Space>
  );
};

interface IControlsAutofillProperties {
  form?: FormInstance;
}
export const ControlsAutofill = ({ form }: IControlsAutofillProperties) => {
  return (
    <SessionContent alwaysShowChildren>
      <Divider plain>Steuererklärung</Divider>
      <ControlButtons form={form} />
      <Divider plain />
    </SessionContent>
  );
};
