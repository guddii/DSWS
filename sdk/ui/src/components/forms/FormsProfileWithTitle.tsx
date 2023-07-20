import { useIdentity } from "../../contexts/IdentityContext";
import { Divider } from "antd";
import { FormsProfile } from "./FormsProfile";

export function FormsProfileWithTitle() {
  const { webId } = useIdentity();

  if (!webId) {
    return null;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Profile Data
      </Divider>
      <FormsProfile />
    </>
  );
}
