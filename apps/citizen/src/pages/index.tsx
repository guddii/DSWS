import Head from "next/head";
import { Button, Input, Typography, Form, message } from "antd";
import { FOAF, useProperty, useResource, Thing } from "solid";
import { SessionContent, StorageControls, turtleFileGenerator } from "ui";

import React from "react";

const { Title } = Typography;

interface IFormStammdatenProperties {
  thing?: Thing;
  thingUrl?: URL;
}

const FormStammdaten = ({ thing, thingUrl }: IFormStammdatenProperties) => {
  const { putResource } = useResource();

  const predicateFirstName = new URL(FOAF.firstName.iri.value);
  const { firstProperty: firstName, error: errorFirstName } = useProperty({
    thing,
    predicate: predicateFirstName,
  });
  const predicateLastName = new URL(FOAF.lastName.iri.value);
  const { firstProperty: lastName, error: errorLastName } = useProperty({
    thing,
    predicate: predicateLastName,
  });

  if (errorFirstName || errorLastName || !thingUrl) {
    return null;
  }

  const onFinish = (values: any) => {
    putResource({
      url: thingUrl,
      body: turtleFileGenerator(values),
    }).then((responseOrVoid) =>
      responseOrVoid
        ? message.success("Successfully updated 'Stammdaten'")
        : message.error("Error while updating 'Stammdaten'")
    );
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ firstName, lastName }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Fist Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Citizen App</title>
      </Head>
      <Title>Citizen App</Title>

      <SessionContent>
        <StorageControls>
          <FormStammdaten />
        </StorageControls>
      </SessionContent>
    </>
  );
}
