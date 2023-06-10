import Head from "next/head";
import { Typography } from "antd";
import { SessionContent, TurtleEditor, ControlsAutofill } from "ui";
import { TaxOfficeModel } from "solid";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Office App</title>
      </Head>
      <Title>Tax Office App</Title>

      <SessionContent>
        <TurtleEditor model={TaxOfficeModel.create({ subject: "#me" })}>
          <ControlsAutofill />
        </TurtleEditor>
      </SessionContent>
    </>
  );
}
