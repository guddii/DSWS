import { ControlsLogin } from "./ControlsLogin";
import { ControlsLogout } from "./ControlsLogout";
import { Metadata } from "next";
import { Space } from "antd";
import { ControlsProfile } from "./ControlsProfile";
import { IAuth } from "../../interfaces/IAuth";

interface IControlsSessionProperties {
  metadata: Metadata;
  auth: IAuth;
}

export function ControlsSession({
  metadata,
  auth,
}: IControlsSessionProperties) {
  return (
    <Space>
      <ControlsProfile />
      <ControlsLogout />
      <ControlsLogin metadata={metadata} auth={auth} />
    </Space>
  );
}
