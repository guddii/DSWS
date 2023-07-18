import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useIdentity } from "../../contexts/IdentityContext";

export function ControlsProfile() {
  const { webId } = useIdentity();

  function reload() {
    globalThis.location.reload();
  }

  function onClickHandler(event: any) {
    event.preventDefault();
    window.open(webId, "identity");
  }

  if (!webId) {
    return null;
  }

  return (
    <Button onClick={onClickHandler} icon={<UserOutlined rev={"webId"} />}>
      {webId}
    </Button>
  );
}
