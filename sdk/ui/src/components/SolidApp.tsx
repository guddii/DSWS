import React, { ReactNode } from "react";
import { Layout } from "antd";
import { Metadata } from "next";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { LayoutMasthead } from "./layout/LayoutMasthead";
import { LayoutContent } from "./layout/LayoutContent";
import { LayoutFooter } from "./layout/LayoutFooter";

interface ISolidAppProperties {
  children: ReactNode;
  metadata: Metadata;
}

export const SolidApp: React.FC<any> = ({
  children,
  metadata,
}: ISolidAppProperties) => {
  return (
    <SessionProvider
      sessionId="session-provider-example"
      onError={console.error}
      restorePreviousSession={false}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <LayoutMasthead metadata={metadata} />
        <LayoutContent> {children} </LayoutContent>
        <LayoutFooter />
      </Layout>
    </SessionProvider>
  );
};
