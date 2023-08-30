import { Form, Input, FormItemProps } from "antd";
import { useIdentity } from "../../contexts/IdentityContext";
import { useEffect } from "react";
import { useTranslation } from "i18n/client";

interface IFormItemWebIdProperties {
  formItemProps?: FormItemProps;
}

export function FormItemWebId({ formItemProps }: IFormItemWebIdProperties) {
  const t = useTranslation();
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
          message: t("_.pleaseEnter", "WebId"),
        },
      ]}
      {...formItemProps}
    >
      <Input />
    </Form.Item>
  );
}
