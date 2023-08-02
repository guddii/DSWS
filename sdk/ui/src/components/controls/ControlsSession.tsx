import { ControlsLogin } from "./ControlsLogin";
import { ControlsLogout } from "./ControlsLogout";
import { Space } from "antd";
import { ControlsProfile } from "./ControlsProfile";

export function ControlsSession() {
  return (
    <Space>
      <ControlsProfile />
      <ControlsLogout />
      <ControlsLogin />
    </Space>
  );
}
