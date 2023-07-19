"use client";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { IdentityProvider } from "../contexts/IdentityContext";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider
      sessionId="session-provider-example"
      onError={console.error}
      restorePreviousSession={false}
    >
      <IdentityProvider>{children}</IdentityProvider>
    </SessionProvider>
  );
};
