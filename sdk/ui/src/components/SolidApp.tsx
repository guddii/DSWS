"use client";
import React, { ReactNode } from "react";
import { Layout } from "antd";
import { Metadata } from "next";
import { LayoutMasthead } from "./layout/LayoutMasthead";
import { LayoutContent } from "./layout/LayoutContent";
import { LayoutFooter } from "./layout/LayoutFooter";
import { Provider } from "./Provider";
import { IAuth } from "../interfaces/IAuth";

interface ISolidAppProperties {
  children: ReactNode;
  metadata: Metadata;
  auth: IAuth;
}

export const SolidApp: React.FC<any> = ({
  children,
  metadata,
  auth,
}: ISolidAppProperties) => {
  return (
    <Provider>
      <Layout style={{ minHeight: "100vh" }}>
        <LayoutMasthead metadata={metadata} auth={auth} />
        <LayoutContent>{children}</LayoutContent>
        <LayoutFooter />
      </Layout>
    </Provider>
  );
};
