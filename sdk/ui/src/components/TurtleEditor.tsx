import { Button, Input, Form, message } from "antd";
import {
  useResource,
  Thing,
  useProperty,
  IParsedProperty,
  AbstractModel,
  UrlString,
  toUrlString,
  getResourceFromResponse,
} from "solid";

import { ReactNode, useState } from "react";
import { ResourceLoader } from "./ResourceLoader";
import { turtleFileGenerator } from "../helper/turtleFileGenerator";
import { formValuesGenerator } from "../helper/formValuesGenerator";
import { propertiesGenerator } from "../helper/propertiesGenerator";
import { UploadToPodModal } from "./UploadToPodModal";

interface IFormItemProperties {
  property: IParsedProperty;
}

const FormItem = ({ property }: IFormItemProperties) => {
  const predicateString = toUrlString(property.predicate);
  const propertyName: string | undefined = predicateString.split("/").pop();

  return (
    <Form.Item
      label={propertyName}
      name={predicateString}
      rules={[
        { required: true, message: `Please input your ${propertyName}!` },
      ]}
      extra={predicateString}
    >
      <Input />
    </Form.Item>
  );
};

interface ITurtleEditorFormProperties {
  children: ReactNode;
  initialValues: Record<string, string>;
  onFinish: (values: Record<string, string>) => void;
  disabled?: boolean;
}

const TurtleEditorForm = ({
  children,
  initialValues,
  onFinish,
  disabled,
}: ITurtleEditorFormProperties) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      disabled={disabled}
    >
      {children}
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

interface ISourceTurtleEditorProperties {
  thing?: Thing;
  thingUrl?: URL;
  subject: string;
}

const SourceTurtleEditor = ({
  thing,
  thingUrl,
  subject,
}: ISourceTurtleEditorProperties) => {
  const { putResource } = useResource();
  const { getProperties } = useProperty();

  if (!thing || !thingUrl) {
    return null;
  }

  const properties: Array<IParsedProperty> = getProperties({
    thing,
  }).map((response) => response.data);

  const propertyValues = formValuesGenerator({ properties });

  const onFinish = (values: Record<string, string>) => {
    putResource({
      url: thingUrl,
      body: turtleFileGenerator({ subject, values }),
    }).then((responseOrVoid) =>
      responseOrVoid
        ? message.success("Successfully updated data")
        : message.error("Error while updating data")
    );
  };

  return (
    <TurtleEditorForm initialValues={propertyValues} onFinish={onFinish}>
      {properties.map((property) => (
        <FormItem key={toUrlString(property.predicate)} property={property} />
      ))}
    </TurtleEditorForm>
  );
};

interface IModelTurtleEditorProperties {
  model: AbstractModel;
}

const ModelTurtleEditor = ({ model }: IModelTurtleEditorProperties) => {
  const properties = propertiesGenerator({ model });
  const propertyValues = formValuesGenerator({ properties });
  const [open, setOpen] = useState(false);
  const [turtleData, setTurtleData] = useState<string | null>(null);

  const onFinish = (values: Record<UrlString, string>) => {
    setTurtleData(turtleFileGenerator({ subject: model.subject, values }));
    setOpen(true);
  };

  const resetState = () => {
    setTurtleData(null);
    setOpen(false);
  };

  const onSuccess = (response: Response) => {
    const resource = getResourceFromResponse(response);
    console.log(resource);
    resetState();
  };

  return (
    <>
      <TurtleEditorForm
        initialValues={propertyValues}
        onFinish={onFinish}
        disabled={open}
      >
        {properties.map((property) => (
          <FormItem key={toUrlString(property.predicate)} property={property} />
        ))}
      </TurtleEditorForm>
      {turtleData && (
        <UploadToPodModal
          open={open}
          data={turtleData}
          onSuccess={onSuccess}
          onCancel={resetState}
        />
      )}
    </>
  );
};

interface ITurtleEditorProperties {
  source?: string;
  model?: AbstractModel;
  subject?: string;
}

export const TurtleEditor = ({
  source,
  model,
  subject,
}: ITurtleEditorProperties) => {
  if (source && subject) {
    return (
      <ResourceLoader dataset={source} subject={subject}>
        <SourceTurtleEditor subject={subject} />
      </ResourceLoader>
    );
  }

  if (model) {
    return <ModelTurtleEditor model={model} />;
  }

  return null;
};
