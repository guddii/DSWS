import { ReactNode, useState } from "react";
import { FormInstance, Typography } from "antd";
import { propertiesGenerator } from "../../helper/propertiesGenerator";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { IModalWebIdValues, ModalWebId } from "../modals/ModalWebId";
import { FormItem } from "../formItem/FormItem";
import {
  AbstractModel,
  toUrlString,
  sendInboxMessage,
  MessageTypes,
  WEB_ID_TO_PROPERTY_MAP,
  getCreatorPredicate,
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
  form: FormInstance;
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
  const [additionalData, setAdditionalData] = useState<Record<string, string>>(
    {}
  );

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
    const { url, data } = await response.json();
    setDataUrlString(url);
    setAdditionalData(data);
    setOpenSaveToInbox(true);
    resetState();
  };

  const onCancelSaveToInbox = () => {
    setOpenSaveToInbox(false);
  };

  const onSubmitSaveToInbox = async () => {
    const predicate = WEB_ID_TO_PROPERTY_MAP[agent.webId];
    const predicateCreator = getCreatorPredicate(
      WEB_ID_TO_PROPERTY_MAP[agent.webId]
    );

    const additionalDataEntries = Object.entries(additionalData).map(
      ([key, value]) => ({
        type: "string",
        predicate: key,
        value,
      })
    );

    await sendInboxMessage({
      recipient: identity,
      sender: agent,
      messageType: MessageTypes.SAVE_TO_DATA_MESSAGE,
      data: {
        subject: identity.webId,
        entries: [
          {
            type: "url",
            predicate: predicate,
            value: dataUrlString,
          },
          {
            type: "url",
            predicate: predicateCreator,
            value: toUrlString(globalThis.location.origin),
          },
          ...additionalDataEntries,
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
              model={model}
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
