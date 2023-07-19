import { Divider } from "antd";
import { IAuth, AuthMethods } from "../../interfaces/IAuth";
import { FormsAuthNWebId } from "./FormsAuthNWebId";

interface IFormsAuthNWebIdWithTitleProperties {
  auth: IAuth;
}

export function FormsAuthNWebIdWithTitle({
  auth,
}: IFormsAuthNWebIdWithTitleProperties) {
  if (!auth.methods.includes(AuthMethods.WebId)) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Secure Login
      </Divider>
      <FormsAuthNWebId />
    </>
  );
}
