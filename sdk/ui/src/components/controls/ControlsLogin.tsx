"use client";
import { useState } from "react";
import { Button, Divider, Drawer, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Metadata } from "next";
import { FormsAuthNSession } from "../forms/FormsAuthNSession";
import { FormsAuthNWebId } from "../forms/FormsAuthNWebId";
import { useIdentity } from "../../contexts/IdentityContext";
import { AuthMethods, IAuth } from "../../interfaces/IAuth";

export function ControlsLogin() {
  const { webId } = useIdentity();
  const { drawerIdentityOpen, setDrawerIdentityOpen } = useIdentity();

  const showDrawer = () => {
    setDrawerIdentityOpen(true);
  };

  const onClose = () => {
    setDrawerIdentityOpen(false);
  };

  if (webId) {
    return null;
  }

  return (
    <Space>
      <Button onClick={showDrawer} icon={<LoginOutlined rev={"solidLogin"} />}>
        Login
      </Button>
    </Space>
  );
}
