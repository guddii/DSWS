import { Divider, Space } from "antd";
import { ControlsProfile } from "./ControlsProfile";
import React from "react";
import { ControlsHelp } from "./ControlsHelp";
import { ControlsInbox } from "./ControlsInbox";
import { IUserMenu } from "../../interfaces/IUserMenu";
import { ControlsLocaleSwitcher } from "./ControlsLocaleSwitcher";

interface IControlsSessionProperties {
  userMenu?: IUserMenu;
}

export function ControlsSession({ userMenu }: IControlsSessionProperties) {
  if (userMenu?.hasInbox) {
    return (
      <Space>
        <ControlsLocaleSwitcher />
        <Divider type={"vertical"} />
        <ControlsHelp />
        <ControlsInbox />
        <ControlsProfile />
      </Space>
    );
  }

  return (
    <Space>
      <ControlsLocaleSwitcher />
      <Divider type={"vertical"} />
      <ControlsHelp />
      <ControlsProfile />
    </Space>
  );
}
