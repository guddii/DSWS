import { Form, Input, FormItemProps } from "antd";

interface IFormItemWebIdProperties {
  formItemProps?: FormItemProps;
}

export function FormItemWebId({ formItemProps }: IFormItemWebIdProperties) {
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
