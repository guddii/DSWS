import { Button, Input, Form, message, FormInstance } from "antd";
import {
  Thing,
  getProperties,
  IParsedProperty,
  AbstractModel,
  toUrlString,
  putResource,
  turtleFileGenerator,
} from "solid";
import { useSession } from "@inrupt/solid-ui-react";
import { ReactNode, useMemo, useState } from "react";
import { ResourceLoader } from "./ResourceLoader";
import { formValuesGenerator } from "../helper/formValuesGenerator";
import { propertiesGenerator } from "../helper/propertiesGenerator";
import { assignPropsToChildren } from "../helper/assignPropsToChildren";
import { hasNoDataOrError } from "../helper/hasNoDataOrError";
import useSWR from "swr";
import { Loading, LoadingFailed } from "./Loading";
import { IWebIdModalValues, WebIdModal } from "./modals/WebIdModal";

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
  form?: FormInstance;
}

const TurtleEditorForm = ({
  children,
  initialValues,
  onFinish,
  disabled,
  form,
}: ITurtleEditorFormProperties) => {
  return (
    <Form
      name="basic"
      form={form}
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
  const { session } = useSession();

  const options = useMemo(() => ({ thing }), [thing]);
  const { data, error, isLoading } = useSWR(options, getProperties);

  if (isLoading) return <Loading />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailed />;
  }
  if (!thingUrl) {
    console.error("thingUrl missing");
    return <LoadingFailed />;
  }

  const propertyValues = formValuesGenerator({ properties: data });

  const onFinish = async (values: Record<string, string>) => {
    try {
      const response = await putResource({
        url: thingUrl,
        body: turtleFileGenerator({ subject, values }),
        session,
      });
      message.success(response.statusText || "Successfully updated data");
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while updating data");
    }
  };

  return (
    <TurtleEditorForm initialValues={propertyValues} onFinish={onFinish}>
      {data.map((property) => (
        <FormItem key={toUrlString(property.predicate)} property={property} />
      ))}
    </TurtleEditorForm>
  );
};

interface IModelTurtleEditorProperties {
  model: AbstractModel;
  children?: ReactNode;
}

const ModelTurtleEditor = ({
  model,
  children,
}: IModelTurtleEditorProperties) => {
  const [form] = Form.useForm();
  const properties = propertiesGenerator({ model });
  const propertyValues = formValuesGenerator({ properties });
  const [open, setOpen] = useState(false);
  const [taxDataUrl, setTaxDataUrl] = useState(null);

  const onFinish = () => {
    setOpen(true);
  };

  const resetState = () => {
    setOpen(false);
  };

  const onSubmit = async ({ webId }: IWebIdModalValues) => {
    const values = form.getFieldsValue();
    const response: Response = await fetch(
      `/api/submitTaxData?webId=${webId}`,
      {
        method: "POST",
        body: JSON.stringify(values),
      }
    );
    const { url } = await response.json();
    setTaxDataUrl(url);
    resetState();
  };

  const childrenWithProps = assignPropsToChildren(children, {
    form,
  });

  return (
    <>
      {childrenWithProps}
      <TurtleEditorForm
        initialValues={propertyValues}
        onFinish={onFinish}
        disabled={open}
        form={form}
      >
        {properties.map((property) => (
          <FormItem key={toUrlString(property.predicate)} property={property} />
        ))}
      </TurtleEditorForm>
      <WebIdModal open={open} onCancel={resetState} onSubmit={onSubmit} />
    </>
  );
};

interface ITurtleEditorProperties {
  source?: string;
  model?: AbstractModel;
  subject?: string;
  children?: ReactNode;
}

export const TurtleEditor = ({
  source,
  model,
  subject,
  children,
}: ITurtleEditorProperties) => {
  if (source && subject) {
    return (
      <ResourceLoader dataset={source} subject={subject}>
        <SourceTurtleEditor subject={subject} />
      </ResourceLoader>
    );
  }

  if (model) {
    return <ModelTurtleEditor model={model}>{children}</ModelTurtleEditor>;
  }

  return null;
};
