import { Form, Input, FormItemProps } from "antd";
import { useIdentity } from "../../contexts/IdentityContext";

interface IFormItemWebIdProperties {
  formItemProps?: FormItemProps;
}

export function FormItemWebId({ formItemProps }: IFormItemWebIdProperties) {
  const { webId } = useIdentity();
  const form = Form.useFormInstance();
  form.setFieldsValue({ webId });

  return (
    <Form.Item
      hidden={true}
      label="WebId"
      name="webId"
      rules={[
        {
          required: true,
          type: "url",
          message: `Please input a valid WebId URL!`,
        },
      ]}
      {...formItemProps}
    >
      <Input />
    </Form.Item>
  );
}
