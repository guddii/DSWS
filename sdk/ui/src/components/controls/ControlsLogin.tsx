"use client";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useIdentity } from "../../contexts/IdentityContext";

export function ControlsLogin() {
  const { webId, setDrawerIdentityOpen } = useIdentity();

  const showDrawer = () => {
    setDrawerIdentityOpen(true);
  };

  if (webId) {
    return null;
  }

  return (
    <Button onClick={showDrawer} icon={<LoginOutlined rev={"solidLogin"} />}>
      Login
    </Button>
  );
}
