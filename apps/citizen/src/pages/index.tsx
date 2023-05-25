import Head from "next/head";
import { Button, Input, Typography, Form, message } from "antd";
import { useResource, Thing, getProperties } from "solid";
import { SessionContent, StorageControls, turtleFileGenerator } from "ui";

import React from "react";

const { Title } = Typography;

interface IFormItemProperties {
  property: {
    properties: Array<string>;
    firstProperty: string;
    error: boolean;
    predicate: string;
  };
}

const FormItem = ({ property }: IFormItemProperties) => {
  if (property.error) {
    return null;
  }

  const propertyName: string | undefined = property.predicate.split("/").pop();

  return (
    <Form.Item
      label={propertyName}
      name={propertyName}
      rules={[
        { required: true, message: `Please input your ${propertyName}!` },
      ]}
      extra={property.predicate}
    >
      <Input />
    </Form.Item>
  );
};

interface IFormStammdatenProperties {
  thing?: Thing;
  thingUrl?: URL;
}

const FormStammdaten = ({ thing, thingUrl }: IFormStammdatenProperties) => {
  const { putResource } = useResource();

  const properties = getProperties({ thing });

  if (!thingUrl) {
    return null;
  }

  const propertyValues: Record<string, string> = {};
  properties.forEach((property) => {
    const propertyName: string | undefined = property.predicate
      .split("/")
      .pop();
    if (propertyName && !property.error) {
      propertyValues[propertyName] = property.firstProperty;
    }
  });

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
      initialValues={propertyValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      {properties.map((property) => (
        <FormItem key={property.predicate} property={property} />
      ))}

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
