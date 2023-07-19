"use client";
import { ReactNode } from "react";
import { Empty } from "antd";
import { useIdentity } from "../contexts/IdentityContext";
import { WebIdLoader } from "./loader/WebIdLoader";

interface ILoggedInContentProperties {
  children: ReactNode;
  alwaysShowChildren?: boolean;
}

export const SessionContent = ({
  children,
  alwaysShowChildren = false,
}: ILoggedInContentProperties) => {
  const { webId } = useIdentity();

  if (!webId) {
    if (alwaysShowChildren) {
      return <>{children}</>;
    } else {
      return (
        <Empty
          description={"This is private content, please login first!"}
          style={{ marginTop: 50 }}
        />
      );
    }
  }

  return <WebIdLoader>{children}</WebIdLoader>;
};
