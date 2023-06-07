import Head from "next/head";
import { Typography } from "antd";
import { SessionContent, StorageControls, TurtleEditor } from "ui";

import React from "react";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Citizen App</title>
      </Head>
      <Title>Citizen App</Title>

      <SessionContent>
        <StorageControls>
          <TurtleEditor subject="#me" />
        </StorageControls>
      </SessionContent>
    </>
  );
}
