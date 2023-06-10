import { useSession } from "solid";
import { ControlsLogin } from "./ControlsLogin";
import { ControlsLogout } from "./ControlsLogout";

export function ControlsSession() {
  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return <ControlsLogout />;
  }
  return <ControlsLogin />;
}
