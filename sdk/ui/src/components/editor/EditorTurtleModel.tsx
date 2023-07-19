import { ReactNode, useState } from "react";
import { Form, Typography } from "antd";
import { propertiesGenerator } from "../../helper/propertiesGenerator";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { IModalWebIdValues, ModalWebId } from "../modals/ModalWebId";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { FormItem } from "../formItem/FormItem";
import { AbstractModel, toUrlString } from "solid";
import { FormsTurtleEditor } from "../forms/FormsTurtleEditor";

interface IEditorTurtleModelProperties {
  model: AbstractModel;
  children?: ReactNode;
}

export const EditorTurtleModel = ({
  model,
  children,
}: IEditorTurtleModelProperties) => {
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

  const onSubmit = async ({ webId }: IModalWebIdValues) => {
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
      <FormsTurtleEditor
        initialValues={propertyValues}
        onFinish={onFinish}
        disabled={open}
        form={form}
      >
        {properties.map((property) => (
          <FormItem key={toUrlString(property.predicate)} property={property} />
        ))}
      </FormsTurtleEditor>
      <ModalWebId
        open={open}
        onCancel={resetState}
        onSubmit={onSubmit}
        reasonElement={
          <Typography.Paragraph>
            The application needs your WebId to create a data vault for you or
            to use an existing one. This vault contains your submitted forms,
            for the inspection of the tax office.
          </Typography.Paragraph>
        }
      />
    </>
  );
};
