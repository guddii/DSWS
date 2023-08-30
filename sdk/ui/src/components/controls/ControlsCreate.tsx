import { DatabaseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "i18n/client";

export const ControlsCreate = () => {
  const t = useTranslation();

  return (
    <Button
      size="middle"
      style={{ width: "100%" }}
      icon={<DatabaseOutlined rev={"DatabaseOutlined"} />}
      href={"https://solidproject.org/users/get-a-pod"}
      target={"_blank"}
    >
      {t("_.getAPod")}
    </Button>
  );
};
