import { Form, Input, FormItemProps } from "antd";
import { useIdentity } from "../../contexts/IdentityContext";
import { useEffect } from "react";

interface IFormItemWebIdProperties {
  formItemProps?: FormItemProps;
}

export function FormItemWebId({ formItemProps }: IFormItemWebIdProperties) {
  const { webId } = useIdentity();
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldsValue({
      webId,
    });
  }, [form, webId]);

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
