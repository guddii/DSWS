import { useIdentity } from "../../contexts/IdentityContext";
import { Divider } from "antd";
import { FormsProfile } from "./FormsProfile";
import { useTranslation } from "i18n/client";

export function FormsProfileWithTitle() {
  const t = useTranslation();
  const { webId } = useIdentity();

  if (!webId) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        {t("_.profileData")}
      </Divider>
      <FormsProfile />
    </>
  );
}
