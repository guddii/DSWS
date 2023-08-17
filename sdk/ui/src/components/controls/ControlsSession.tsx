import { Space } from "antd";
import { ControlsProfile } from "./ControlsProfile";
import React from "react";
import { ControlsHelp } from "./ControlsHelp";
import { ControlsInbox } from "./ControlsInbox";
import { IUserMenu } from "../../interfaces/IUserMenu";

interface IControlsSessionProperties {
  userMenu?: IUserMenu;
}

export function ControlsSession({ userMenu }: IControlsSessionProperties) {
  if (userMenu?.hasInbox) {
    return (
      <Space>
        <ControlsHelp />
        <ControlsInbox />
        <ControlsProfile />
      </Space>
    );
  }

  return (
    <Space>
      <ControlsHelp />
      <ControlsProfile />
    </Space>
  );
}
