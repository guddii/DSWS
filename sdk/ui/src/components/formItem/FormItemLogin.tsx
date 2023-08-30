import { Button, Form } from "antd";
import { useTranslation } from "i18n/client";

export function FormItemLogin() {
  const t = useTranslation();

  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType={"submit"}
        size="large"
        style={{ width: "100%" }}
      >
        {t("_.login")}
      </Button>
    </Form.Item>
  );
}
