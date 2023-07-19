import { Divider } from "antd";
import { IAuth, AuthMethods } from "../../interfaces/IAuth";
import { Metadata } from "next";
import { FormsAuthNSession } from "./FormsAuthNSession";

interface IFormsAuthNSessionWithTitleProperties {
  metadata: Metadata;
  auth: IAuth;
}

export function FormsAuthNSessionWithTitle({
  metadata,
  auth,
}: IFormsAuthNSessionWithTitleProperties) {
  if (!auth.methods.includes(AuthMethods.Session)) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Full Access
      </Divider>
      <FormsAuthNSession metadata={metadata} />
    </>
  );
}
