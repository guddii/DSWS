import { Form, Input } from "antd";
import { useTranslation } from "i18n/client";

export function FormItemSelectedPodUrl() {
  const t = useTranslation();
  return (
    <Form.Item
      label={t("_.storage")}
      name="storage"
      rules={[
        {
          required: true,
          type: "url",
          message: t("_.pleaseEnter", "Storage"),
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
}
