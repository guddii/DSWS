import { LogoutButton, useSession } from "solid";
import { Button, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

export function ControlsLogout() {
  const { session } = useSession();

  function reload() {
    globalThis.location.reload();
  }

  function onClickHandler(event: any) {
    event.preventDefault();
    window.open(session.info.webId, "identity");
  }

  return (
    <>
      <Space wrap>
        <Button onClick={onClickHandler} icon={<UserOutlined rev={"webId"} />}>
          {session.info.webId}
        </Button>
        <LogoutButton onLogout={reload} onError={console.error}>
          <Button icon={<LogoutOutlined rev={"solidLogout"} />}>Logout</Button>
        </LogoutButton>
      </Space>
    </>
  );
}
