import Head from "next/head";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Citizen App</title>
      </Head>
      <Title>Citizen App</Title>
    </>
  );
}
