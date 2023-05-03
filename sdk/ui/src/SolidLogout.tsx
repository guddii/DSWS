import { LogoutButton, useSession } from "@inrupt/solid-ui-react";
import { Button, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

export function SolidLogout() {
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
        <Button onClick={onClickHandler} icon={<UserOutlined />}>
          {session.info.webId}
        </Button>
        <LogoutButton onLogout={reload}>
          <Button icon={<LogoutOutlined />}>Logout</Button>
        </LogoutButton>
      </Space>
    </>
  );
}
