import { App, Button, Divider, Form, FormInstance, Input } from "antd";
import {
  IRequestReferenceAccessBody,
  checkResponse,
  toUrlString,
  getCreatorPredicate,
  UrlString,
  SolidDataset,
  getThing,
  fillModalFields,
  AbstractModel,
  Thing,
} from "solid";
import { IParsedPropertyWithRulesAndOptions } from "../../helper/propertiesGenerator";
import { useCallback, useState } from "react";
import { ModalAccessRequestToInbox } from "../modals/ModalAccessRequestToInbox";
import { ModalModelDataOverwrite } from "../modals/ModalModelDataOverwrite";
import { useIdentity } from "../../contexts/IdentityContext";
import { useAgent } from "../../contexts/AgentContext";
import { I18nKey, useTranslation } from "i18n/client";

interface IFormItemProperties {
  property: IParsedPropertyWithRulesAndOptions;
  form: FormInstance;
  model: AbstractModel;
}

export const FormItemReference = ({
  property,
  form,
  model,
}: IFormItemProperties) => {
  const identity = useIdentity();
  const agent = useAgent();
  const t = useTranslation();
  const { message } = App.useApp();
  const predicateString = toUrlString(property.predicate);
  const propertyName: string = t(predicateString as I18nKey);
  const predicateCreatorString = getCreatorPredicate(predicateString);
  const propertyCreatorName: string = t(predicateCreatorString as I18nKey);
  const [referenceThing, setReferenceThing] = useState<Thing | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openAccessRequestToInbox, setOpenAccessRequestToInbox] =
    useState(false);
  const [openModelDataOverwrite, setOpenModelDataOverwrite] = useState(false);

  /**
   * Tries to load the data with the reference currently in the form item to fill the current
   * attachment card form entries with the data.
   */
  const loadReference = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentValue = form.getFieldValue(toUrlString(property.predicate));
      if (!currentValue) {
        return;
      }

      const searchParams = new URLSearchParams();
      searchParams.append("referenceUrl", currentValue);

      const response = await fetch(
        "/api/getReferenceDataset?" + searchParams.toString()
      );

      if (response.status === 403) {
        setOpenAccessRequestToInbox(true);
        return;
      }

      await checkResponse(response);

      const dataset: SolidDataset = await response.json();
      const thing = getThing(dataset, identity.webId);
      if (!thing) {
        throw new Error("No data found for user in dataset");
      }

      const isNotEmpty = model.values.some(({ predicate }) => {
        const predicateString = toUrlString(predicate);

        if (predicateString !== toUrlString(property.predicate)) {
          const fieldValue = form.getFieldValue(predicateString);
          if (fieldValue !== "") {
            return true;
          }
        }
        return false;
      });

      if (isNotEmpty) {
        setReferenceThing(thing);
        setOpenModelDataOverwrite(true);
      } else {
        fillModalFields(thing, form, model);
      }
    } catch (error: any) {
      console.error(error);
      message.error(
        (error.message && t(error.message)) ||
          t("sdk.ui.components.formItem.FormItemReference.loadError")
      );
    } finally {
      setIsLoading(false);
    }
  }, [form, identity.webId, message, model, property.predicate, t]);

  /**
   * Fills modal with thing from state if available.
   */
  const onOverwriteData = async () => {
    if (!referenceThing) {
      message.error(t("No data found for user in dataset"));
    } else {
      fillModalFields(referenceThing, form, model);
      setReferenceThing(null);
    }
    setOpenModelDataOverwrite(false);
  };

  /**
   * Sends an inbox message with a request to access the reference currently in the form item.
   */
  const onRequestReferenceAccess = async () => {
    const creator = form.getFieldValue(
      getCreatorPredicate(toUrlString(property.predicate))
    ) as UrlString;

    if (!creator) {
      message.error(
        t("sdk.ui.components.formItem.FormItemReference.submitError")
      );
      return;
    }

    const requestBody: IRequestReferenceAccessBody = {
      requestor: agent.webId,
      owner: identity.webId,
      target: form.getFieldValue(property.predicate),
      access: { read: true },
      serviceProvider: creator,
    };

    const response: Response = await fetch(
      `${creator}/api/requestReferenceAccess`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );

    await checkResponse(response);
    setOpenAccessRequestToInbox(false);
  };

  return (
    <>
      <Form.Item label={propertyName} extra={predicateString}>
        <Form.Item
          name={predicateString}
          noStyle
          rules={[
            {
              ...property.rules,
              message: `Please input your ${propertyName}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label={propertyCreatorName} extra={predicateCreatorString}>
        <Form.Item
          name={predicateCreatorString}
          noStyle
          rules={[
            {
              ...property.rules,
              message: `Please input your ${propertyCreatorName}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label={t("_.actions")}>
        <Button onClick={loadReference} loading={isLoading}>
          {t("sdk.ui.components.formItem.FormItemReference.load")}
        </Button>
      </Form.Item>

      <ModalAccessRequestToInbox
        open={openAccessRequestToInbox}
        onCancel={() => setOpenAccessRequestToInbox(false)}
        onSubmit={onRequestReferenceAccess}
      />
      <ModalModelDataOverwrite
        open={openModelDataOverwrite}
        onCancel={() => setOpenModelDataOverwrite(false)}
        onSubmit={onOverwriteData}
      />

      <Divider />
    </>
  );
};
