import { Divider, Typography } from "antd";
import { IAuth, AuthMethods } from "../../interfaces/IAuth";
import { Metadata } from "next";
import { FormsAuthNSession } from "./FormsAuthNSession";
import { useIdentity } from "../../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

interface IFormsAuthNSessionWithTitleProperties {
  metadata: Metadata;
  auth: IAuth;
}

export function FormsAuthNSessionWithTitle({
  metadata,
  auth,
}: IFormsAuthNSessionWithTitleProperties) {
  const t = useTranslation();
  const { webId } = useIdentity();

  if (!auth.methods.includes(AuthMethods.Session) || webId) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        {t("_.login")}
      </Divider>
      <Typography.Paragraph>
        {t("sdk.ui.components.forms.FormsAuthNSessionWithTitle")}
      </Typography.Paragraph>
      <FormsAuthNSession metadata={metadata} />
    </>
  );
}
