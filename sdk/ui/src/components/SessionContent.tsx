"use client";
import React, { ReactNode } from "react";
import { Empty, Space, Typography } from "antd";
import { useIdentity } from "../contexts/IdentityContext";
import { ControlsLogin } from "./controls/ControlsLogin";
import Link from "next/link";
import { ControlsCreate } from "./controls/ControlsCreate";

interface ILoggedInContentProperties {
  children: ReactNode;
  alwaysShowChildren?: boolean;
}

export const SessionContent = ({
  children,
  alwaysShowChildren = false,
}: ILoggedInContentProperties) => {
  const { webId } = useIdentity();

  if (!alwaysShowChildren && !webId) {
    return (
      <Empty
        style={{ margin: "50px auto" }}
        description={
          <Space direction="vertical" size="middle">
            <Typography.Paragraph style={{ maxWidth: 250 }}>
              This application requires a Pod as data storage and a WebId to
              identify yourself in the web.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Find out more at{" "}
              <Link href="https://solidproject.org/" target={"_blank"}>
                https://solidproject.org/
              </Link>
              .
            </Typography.Paragraph>
          </Space>
        }
      >
        <Space>
          <ControlsCreate />
          <ControlsLogin size={"middle"} />
        </Space>
      </Empty>
    );
  }

  return <>{children}</>;
};
