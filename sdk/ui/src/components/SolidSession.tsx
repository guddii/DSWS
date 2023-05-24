import { useSession } from "solid";
import { SolidLogin } from "./SolidLogin";
import { SolidLogout } from "./SolidLogout";

export function SolidSession() {
  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return <SolidLogout />;
  }
  return <SolidLogin />;
}
