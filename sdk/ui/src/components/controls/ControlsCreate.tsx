import { DatabaseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ControlsCreate = () => {
  return (
    <Button
      size="middle"
      style={{ width: "100%" }}
      icon={<DatabaseOutlined rev={"solidGetAPod"} />}
      href={"https://solidproject.org/users/get-a-pod"}
      target={"_blank"}
    >
      Get a Pod
    </Button>
  );
};
