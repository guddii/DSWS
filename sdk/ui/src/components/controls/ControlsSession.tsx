import { ControlsLogin } from "./ControlsLogin";
import { ControlsLogout } from "./ControlsLogout";
import { Metadata } from "next";
import { Space } from "antd";
import { ControlsProfile } from "./ControlsProfile";
import { IAuth } from "../../interfaces/IAuth";
import { DrawerIdentity } from "../drawer/DrawerIdentity";

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
      <ControlsLogin />
      <DrawerIdentity metadata={metadata} auth={auth} />
    </Space>
  );
}
