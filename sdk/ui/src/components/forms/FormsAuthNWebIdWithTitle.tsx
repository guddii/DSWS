import { Divider, Typography } from "antd";
import { IAuth, AuthMethods } from "../../interfaces/IAuth";
import { FormsAuthNWebId } from "./FormsAuthNWebId";
import { useIdentity } from "../../contexts/IdentityContext";

interface IFormsAuthNWebIdWithTitleProperties {
  auth: IAuth;
}

export function FormsAuthNWebIdWithTitle({
  auth,
}: IFormsAuthNWebIdWithTitleProperties) {
  const { webId } = useIdentity();

  if (!auth.methods.includes(AuthMethods.WebId) || webId) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Login
      </Divider>
      <Typography.Paragraph>
        Login with no access for this application
      </Typography.Paragraph>
      <FormsAuthNWebId />
    </>
  );
}
