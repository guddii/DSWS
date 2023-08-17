import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useIdentity } from "../../contexts/IdentityContext";
import React from "react";

export function ControlsProfile() {
  const { setDrawerIdentityOpen } = useIdentity();

  const showDrawer = () => {
    setDrawerIdentityOpen(true);
  };

  return (
    <Button onClick={showDrawer} icon={<UserOutlined rev={"UserOutlined"} />} />
  );
}
