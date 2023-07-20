import { Divider, Typography } from "antd";
import { IAuth, AuthMethods } from "../../interfaces/IAuth";
import { Metadata } from "next";
import { FormsAuthNSession } from "./FormsAuthNSession";
import { useIdentity } from "../../contexts/IdentityContext";

interface IFormsAuthNSessionWithTitleProperties {
  metadata: Metadata;
  auth: IAuth;
}

export function FormsAuthNSessionWithTitle({
  metadata,
  auth,
}: IFormsAuthNSessionWithTitleProperties) {
  const { webId } = useIdentity();

  if (!auth.methods.includes(AuthMethods.Session) || webId) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Login
      </Divider>
      <Typography.Paragraph>
        Login with full access for this application
      </Typography.Paragraph>
      <FormsAuthNSession metadata={metadata} />
    </>
  );
}
