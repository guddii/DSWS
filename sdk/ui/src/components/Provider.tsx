"use client";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { IdentityProvider } from "../contexts/IdentityContext";
import { ReactNode } from "react";
import { AgentProvider } from "../contexts/AgentContext";
import { IAgent } from "../interfaces/IAgent";
import { App, ConfigProvider } from "antd";
import { LayoutProvider } from "../contexts/LayoutContext";

interface IProviderProperties {
  children: ReactNode;
  agent?: IAgent;
}

export const Provider = ({ children, agent }: IProviderProperties) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7C4DFF",
          colorLink: "#7C4DFF",
          colorBgBase: "#f5f5f5",
          colorBorder: "#d3d3d3",
          colorBorderSecondary: "#d3d3d3",
        },
      }}
    >
      <App>
        <SessionProvider
          sessionId="session-provider-example"
          onError={console.error}
          restorePreviousSession={false}
        >
          <LayoutProvider>
            <IdentityProvider>
              <AgentProvider agent={agent}>{children}</AgentProvider>
            </IdentityProvider>
          </LayoutProvider>
        </SessionProvider>
      </App>
    </ConfigProvider>
  );
};
