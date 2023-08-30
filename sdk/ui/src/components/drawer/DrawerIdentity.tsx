import { Metadata } from "next";
import { IAuth } from "../../interfaces/IAuth";
import { Drawer } from "antd";
import { FormsAuthNSessionWithTitle } from "../forms/FormsAuthNSessionWithTitle";
import { FormsAuthNWebIdWithTitle } from "../forms/FormsAuthNWebIdWithTitle";
import { FormsProfileWithTitle } from "../forms/FormsProfileWithTitle";
import { useIdentity } from "../../contexts/IdentityContext";
import { ControlsLogout } from "../controls/ControlsLogout";
import { useTranslation } from "i18n/client";

interface IDrawerIdentityProperties {
  metadata: Metadata;
  auth: IAuth;
}

export function DrawerIdentity({ metadata, auth }: IDrawerIdentityProperties) {
  const t = useTranslation();
  const { drawerIdentityOpen, setDrawerIdentityOpen } = useIdentity();

  const onClose = () => {
    setDrawerIdentityOpen(false);
  };

  return (
    <Drawer title={t("_.identity")} onClose={onClose} open={drawerIdentityOpen}>
      <FormsAuthNSessionWithTitle metadata={metadata} auth={auth} />
      <FormsAuthNWebIdWithTitle auth={auth} />
      <FormsProfileWithTitle />
      <ControlsLogout />
    </Drawer>
  );
}
