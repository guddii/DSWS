import { ReactNode, useState } from "react";
import { Form, Typography } from "antd";
import { propertiesGenerator } from "../../helper/propertiesGenerator";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { IModalWebIdValues, ModalWebId } from "../modals/ModalWebId";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { FormItem } from "../formItem/FormItem";
import { AbstractModel, toUrlString, sendInboxMessage } from "solid";
import { FormsTurtleEditor } from "../forms/FormsTurtleEditor";
import { ModalSaveToInbox } from "../modals/ModalSaveToInbox";
import { useIdentity } from "../../contexts/IdentityContext";
import { useAgent } from "../../contexts/AgentContext";

interface IEditorTurtleModelProperties {
  model: AbstractModel;
  children?: ReactNode;
}

export const EditorTurtleModel = ({
  model,
  children,
}: IEditorTurtleModelProperties) => {
  const identity = useIdentity();
  const agent = useAgent();
  const [form] = Form.useForm();
  const properties = propertiesGenerator({ model });
  const propertyValues = formValuesGenerator({ properties });
  const [openWebIdConfirm, setOpenWebIdConfirm] = useState(false);
  const [openSaveToInbox, setOpenSaveToInbox] = useState(false);
  const [taxDataUrlString, setTaxDataUrlString] = useState("");

  const onFinish = () => {
    setOpenWebIdConfirm(true);
  };

  const resetState = () => {
    setOpenWebIdConfirm(false);
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
    setTaxDataUrlString(url);
    setOpenSaveToInbox(true);
    resetState();
  };

  const childrenWithProps = assignPropsToChildren(children, {
    form,
  });

  const onCancelSaveToInbox = () => {
    setOpenSaveToInbox(false);
  };

  const onSubmitSaveToInbox = async () => {
    await sendInboxMessage({
      recipient: identity,
      sender: agent,
      data: {
        reference: taxDataUrlString,
      },
    });
    setOpenSaveToInbox(false);
  };

  return (
    <>
      {childrenWithProps}
      <FormsTurtleEditor
        initialValues={propertyValues}
        onFinish={onFinish}
        disabled={openWebIdConfirm}
        form={form}
      >
        {properties.map((property) => (
          <FormItem key={toUrlString(property.predicate)} property={property} />
        ))}
      </FormsTurtleEditor>
      <ModalWebId
        open={openWebIdConfirm}
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
      <ModalSaveToInbox
        open={openSaveToInbox}
        onCancel={onCancelSaveToInbox}
        onSubmit={onSubmitSaveToInbox}
      />
    </>
  );
};
