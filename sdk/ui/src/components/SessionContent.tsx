"use client";
import React, { CSSProperties, ReactNode } from "react";
import { Button, Empty, Space, Typography } from "antd";
import { useIdentity } from "../contexts/IdentityContext";
import { ControlsLogin } from "./controls/ControlsLogin";
import { DatabaseOutlined } from "@ant-design/icons";
import Link from "next/link";

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
    const style: CSSProperties = {
      width: 350,
      marginLeft: "auto",
      marginRight: "auto",
    };
    return (
      <Empty
        style={{ marginTop: 50 }}
        description={
          <div>
            <Typography.Paragraph style={style}>
              This application requires a Pod as data storage and a WebId to
              identify yourself in the web.
            </Typography.Paragraph>
            <Typography.Paragraph style={style}>
              Find out more at{" "}
              <Link href="https://solidproject.org/" target={"_blank"}>
                https://solidproject.org/
              </Link>
              .
            </Typography.Paragraph>
          </div>
        }
      >
        <Space>
          <ControlsLogin />
          <Button
            type="primary"
            icon={<DatabaseOutlined rev={"solidGetAPod"} />}
            href={"https://solidproject.org/users/get-a-pod"}
            target={"_blank"}
          >
            Get a Pod
          </Button>
        </Space>
      </Empty>
    );
  }

  return <>{children}</>;
};
