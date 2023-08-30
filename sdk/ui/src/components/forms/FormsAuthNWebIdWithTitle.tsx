import { Divider, Typography } from "antd";
import { IAuth, AuthMethods } from "../../interfaces/IAuth";
import { FormsAuthNWebId } from "./FormsAuthNWebId";
import { useIdentity } from "../../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

interface IFormsAuthNWebIdWithTitleProperties {
  auth: IAuth;
}

export function FormsAuthNWebIdWithTitle({
  auth,
}: IFormsAuthNWebIdWithTitleProperties) {
  const t = useTranslation();
  const { webId } = useIdentity();

  if (!auth.methods.includes(AuthMethods.WebId) || webId) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        {t("_.login")}
      </Divider>
      <Typography.Paragraph>
        {t("sdk.ui.components.forms.FormsAuthNWebIdWithTitle")}
      </Typography.Paragraph>
      <FormsAuthNWebId />
    </>
  );
}
