"use client";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { IdentityProvider } from "../contexts/IdentityContext";
import { ReactNode } from "react";
import { AgentProvider } from "../contexts/AgentContext";
import { IAgent } from "../interfaces/IAgent";

interface IProviderProperties {
  children: ReactNode;
  agent?: IAgent;
}

export const Provider = ({ children, agent }: IProviderProperties) => {
  return (
    <SessionProvider
      sessionId="session-provider-example"
      onError={console.error}
      restorePreviousSession={false}
    >
      <IdentityProvider>
        <AgentProvider agent={agent}>{children}</AgentProvider>
      </IdentityProvider>
    </SessionProvider>
  );
};
