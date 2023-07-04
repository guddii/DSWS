import { useSession } from "@inrupt/solid-ui-react";
import { ControlsLogin } from "./ControlsLogin";
import { ControlsLogout } from "./ControlsLogout";
import { Metadata } from "next";

interface IControlsSessionProperties {
  metadata: Metadata;
}

export function ControlsSession({ metadata }: IControlsSessionProperties) {
  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return <ControlsLogout />;
  }
  return <ControlsLogin metadata={metadata} />;
}
