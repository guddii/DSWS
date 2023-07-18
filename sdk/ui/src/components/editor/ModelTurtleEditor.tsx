import { ReactNode, useState } from "react";
import { Form } from "antd";
import { propertiesGenerator } from "../../helper/propertiesGenerator";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { IWebIdModalValues, WebIdModal } from "../modals/WebIdModal";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { TurtleEditorForm } from "./TurtleEditorForm";
import { FormItem } from "../formItem/FormItem";
import { AbstractModel, toUrlString } from "solid";

interface IModelTurtleEditorProperties {
  model: AbstractModel;
  children?: ReactNode;
}

export const ModelTurtleEditor = ({
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
