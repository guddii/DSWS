import Head from "next/head";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Office App</title>
      </Head>
      <Title>Tax Office App</Title>
    </>
  );
}
