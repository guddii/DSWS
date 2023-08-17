"use client";
import React, { ReactNode } from "react";
import { Layout } from "antd";
import { Metadata } from "next";
import { Provider } from "./Provider";
import { IAuth } from "../interfaces/IAuth";
import { Initializing } from "./Loading";
import { DrawerIdentity } from "./drawer/DrawerIdentity";
import { IAgent } from "../interfaces/IAgent";
import { LayoutMasthead } from "./layout/LayoutMasthead";
import { IUserMenu } from "../interfaces/IUserMenu";
import { LayoutSider } from "./layout/LayoutSider";
import { INavigation } from "../interfaces/INavigation";
import "antd/dist/reset.css";

interface ISolidAppProperties {
  children: ReactNode;
  metadata: Metadata;
  auth: IAuth;
  agent?: IAgent;
  userMenu?: IUserMenu;
  navigation?: INavigation;
}

export const SolidApp = ({
  children,
  metadata,
  auth,
  agent,
  userMenu,
  navigation,
}: ISolidAppProperties) => {
  return (
    <>
      <Initializing />
      <Provider agent={agent}>
        <Layout
          style={{ minWidth: 300, height: "100vh", overflow: "hidden scroll" }}
        >
          <LayoutMasthead metadata={metadata} userMenu={userMenu} />
          <Layout>
            <LayoutSider navigation={navigation} />
            {children}
          </Layout>
        </Layout>
        <DrawerIdentity metadata={metadata} auth={auth} />
      </Provider>
    </>
  );
};
