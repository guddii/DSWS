import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useIdentity } from "../../contexts/IdentityContext";

export function ControlsProfile() {
  const { webId, setDrawerIdentityOpen } = useIdentity();

  const showDrawer = () => {
    setDrawerIdentityOpen(true);
  };

  if (!webId) {
    return null;
  }

  return (
    <Button onClick={showDrawer} icon={<UserOutlined rev={"webId"} />}>
      {webId}
    </Button>
  );
}
