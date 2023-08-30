import { LogoutButton } from "@inrupt/solid-ui-react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useIdentity } from "../../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

export function ControlsLogout() {
  const t = useTranslation();
  const { webId } = useIdentity();

  function reload() {
    sessionStorage.clear();
    globalThis.location.reload();
  }

  if (!webId) {
    return null;
  }

  return (
    <LogoutButton onLogout={reload} onError={console.error}>
      <Button
        type="primary"
        size="large"
        style={{ width: "100%" }}
        icon={<LogoutOutlined rev={"solidLogout"} />}
      >
        {t("_.logout")}
      </Button>
    </LogoutButton>
  );
}
