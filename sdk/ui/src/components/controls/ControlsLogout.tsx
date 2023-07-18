import { LogoutButton } from "@inrupt/solid-ui-react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useIdentity } from "../../contexts/IdentityContext";

export function ControlsLogout() {
  const { webId } = useIdentity();

  function reload() {
    globalThis.location.reload();
  }

  if (!webId) {
    return null;
  }

  return (
    <LogoutButton onLogout={reload} onError={console.error}>
      <Button icon={<LogoutOutlined rev={"solidLogout"} />}>Logout</Button>
    </LogoutButton>
  );
}
