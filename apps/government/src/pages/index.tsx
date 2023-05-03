import Head from "next/head";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Government App</title>
      </Head>
      <Title>Government App</Title>
    </>
  );
}
