import { ReactNode, useState } from "react";
import { Typography } from "antd";
import { propertiesGenerator } from "../../helper/propertiesGenerator";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { IModalWebIdValues, ModalWebId } from "../modals/ModalWebId";
import { FormItem } from "../formItem/FormItem";
import {
  AbstractModel,
  toUrlString,
  sendInboxMessage,
  MessageTypes,
  SENDER_TO_PROPERTY_MAP,
} from "solid";
import { FormsTurtleEditor } from "../forms/FormsTurtleEditor";
import { ModalSaveToInbox } from "../modals/ModalSaveToInbox";
import { useIdentity } from "../../contexts/IdentityContext";
import { useAgent } from "../../contexts/AgentContext";
import { useTranslation } from "i18n/client";
import { FormItemReference } from "../formItem/FormItemReference";

interface IEditorTurtleModelProperties {
  model: AbstractModel;
  children?: ReactNode;
  form: any;
}

export const EditorTurtleModel = ({
  model,
  form,
  children,
}: IEditorTurtleModelProperties) => {
  const t = useTranslation();
  const identity = useIdentity();
  const agent = useAgent();
  const properties = propertiesGenerator({ model });
  const propertyValues = formValuesGenerator({ properties });
  const [openWebIdConfirm, setOpenWebIdConfirm] = useState(false);
  const [openSaveToInbox, setOpenSaveToInbox] = useState(false);
  const [dataUrlString, setDataUrlString] = useState("");

  const onFinish = () => {
    setOpenWebIdConfirm(true);
  };

  const resetState = () => {
    setOpenWebIdConfirm(false);
  };

  const onSubmit = async ({ webId }: IModalWebIdValues) => {
    const values = form.getFieldsValue();
    const response: Response = await fetch(`/api/submitData?webId=${webId}`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    const { url } = await response.json();
    setDataUrlString(url);
    setOpenSaveToInbox(true);
    resetState();
  };

  const onCancelSaveToInbox = () => {
    setOpenSaveToInbox(false);
  };

  const onSubmitSaveToInbox = async () => {
    await sendInboxMessage({
      recipient: identity,
      sender: agent,
      messageType: MessageTypes.SAVE_TO_DATA_MESSAGE,
      data: {
        subject: identity.webId,
        entries: [
          {
            type: "url",
            predicate: SENDER_TO_PROPERTY_MAP[agent.webId],
            value: dataUrlString,
          },
        ],
      },
    });
    setOpenSaveToInbox(false);
  };

  return (
    <>
      {children}
      <FormsTurtleEditor
        initialValues={propertyValues}
        onFinish={onFinish}
        disabled={openWebIdConfirm}
        form={form}
      >
        {properties.map((property) =>
          property.options?.reference ? (
            <FormItemReference
              key={toUrlString(property.predicate)}
              property={property}
              form={form}
            />
          ) : (
            <FormItem
              key={toUrlString(property.predicate)}
              property={property}
            />
          )
        )}
      </FormsTurtleEditor>
      <ModalWebId
        open={openWebIdConfirm}
        onCancel={resetState}
        onSubmit={onSubmit}
        reasonElement={
          <Typography.Paragraph>
            {t("sdk.ui.components.editor.EditorTurtleModel.reasonElement.1")}
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
