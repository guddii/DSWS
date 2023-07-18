"use client";
import { useState } from "react";
import { Button, Divider, Drawer, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Metadata } from "next";
import { FormsAuthNSession } from "../forms/FormsAuthNSession";
import { FormsAuthNWebId } from "../forms/FormsAuthNWebId";
import { useIdentity } from "../../contexts/IdentityContext";
import { AuthMethods, IAuth } from "../../interfaces/IAuth";

interface IFormsAuthNSessionWithTitleProperties {
  metadata: Metadata;
  auth: IAuth;
}

function FormsAuthNSessionWithTitle({
  metadata,
  auth,
}: IFormsAuthNSessionWithTitleProperties) {
  if (!auth.methods.includes(AuthMethods.Session)) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Full Access
      </Divider>
      <FormsAuthNSession metadata={metadata} />
    </>
  );
}

interface IFormsAuthNWebIdWithTitleProperties {
  auth: IAuth;
}

function FormsAuthNWebIdWithTitle({
  auth,
}: IFormsAuthNWebIdWithTitleProperties) {
  if (!auth.methods.includes(AuthMethods.WebId)) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Secure Login
      </Divider>
      <FormsAuthNWebId />
    </>
  );
}

interface IControlsLoginProperties {
  metadata: Metadata;
  auth: IAuth;
}

export function ControlsLogin({ metadata, auth }: IControlsLoginProperties) {
  const { webId } = useIdentity();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (webId) {
    return null;
  }

  return (
    <>
      <Drawer title="Login" onClose={onClose} open={open}>
        <FormsAuthNSessionWithTitle metadata={metadata} auth={auth} />
        <FormsAuthNWebIdWithTitle auth={auth} />
      </Drawer>

      <Space>
        <Button
          onClick={showDrawer}
          icon={<LoginOutlined rev={"solidLogin"} />}
        >
          Login
        </Button>
      </Space>
    </>
  );
}
