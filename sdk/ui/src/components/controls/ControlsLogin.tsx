import { useEffect, useState } from "react";
import { LoginButton, OIDC_ISSUER } from "solid";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";

interface Item {
  key: string;
  label: string;
}

type Items = Array<Item>;

export function ControlsLogin() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(globalThis.location.href);
  }, [setCurrentUrl]);

  const items: Items = OIDC_ISSUER.map((value, index) => {
    return {
      key: String(index),
      label: String(value),
    };
  });

  const [idp, setIdp] = useState(items[0].label);

  const handleMenuClick: MenuProps["onClick"] = (event) => {
    const item: Item | undefined = items.find(
      (value: Item) => value.key === event.key
    );
    if (item) setIdp(item.label);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Space>
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        {idp}
      </Dropdown.Button>
      <LoginButton
        authOptions={{ clientName: "Solid app" }}
        oidcIssuer={idp}
        redirectUrl={currentUrl}
        onError={console.error}
      >
        <Button icon={<LoginOutlined rev={"solidLogin"} />}>Login</Button>
      </LoginButton>
    </Space>
  );
}
