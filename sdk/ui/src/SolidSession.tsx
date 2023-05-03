import { useSession } from "@inrupt/solid-ui-react";
import { SolidLogin } from "./SolidLogin";
import { SolidLogout } from "./SolidLogout";

export function SolidSession() {
  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return <SolidLogout />;
  }
  return <SolidLogin />;
}
