import { App, Button, Form, FormInstance, Input, Space } from "antd";
import {
  IRequestReferenceAccessBody,
  checkResponse,
  toUrlString,
  getCreatorPredicateString,
  UrlString,
} from "solid";
import { IParsedPropertyWithRulesAndOptions } from "../../helper/propertiesGenerator";
import { useCallback, useState } from "react";
import { ModalAccessRequestToInbox } from "../modals/ModalAccessRequestToInbox";
import { useIdentity } from "../../contexts/IdentityContext";
import { useAgent } from "../../contexts/AgentContext";
import { I18nKey, useTranslation } from "i18n/client";

interface IFormItemProperties {
  property: IParsedPropertyWithRulesAndOptions;
  form: FormInstance;
}

export const FormItemReference = ({ property, form }: IFormItemProperties) => {
  const identity = useIdentity();
  const agent = useAgent();
  const t = useTranslation();
  const { message } = App.useApp();
  const predicateString = toUrlString(property.predicate);
  const propertyName: string = t(predicateString as I18nKey);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * Loads the data with the reference currently in the form item. If the loading
   * fails with a 403 status it opens the dialog to send an inbox message.
   */
  const loadReference = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentValue = form.getFieldValue(property.predicate);
      if (!currentValue) {
        return;
      }

      const searchParams = new URLSearchParams();
      searchParams.append("referenceUrl", currentValue);

      const response = await fetch(
        "/api/getReferenceDataset?" + searchParams.toString()
      );

      if (response.status === 403) {
        setOpen(true);
        return;
      }

      await checkResponse(response);

      const dataset = await response.json();
      // TODO: display data in form instead of logging it
      console.log(dataset);
    } catch (error: any) {
      console.error(error);
      message.error(
        (error.message && t(error.message)) ||
          t("sdk.ui.components.formItem.FormItemReference.loadError")
      );
    } finally {
      setIsLoading(false);
    }
  }, [form, message, property.predicate, t]);

  /**
   * Sends an inbox message with a request to access the reference currently in the form item.
   */
  const onSubmit = async () => {
    const creator = form.getFieldValue(
      getCreatorPredicateString(property.predicate)
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
    setOpen(false);
  };

  return (
    <>
      <Form.Item label={propertyName} extra={predicateString}>
        <Space.Compact style={{ display: "flex" }}>
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
          <Button onClick={loadReference} loading={isLoading} type="primary">
            {t("sdk.ui.components.formItem.FormItemReference.load")}
          </Button>
        </Space.Compact>
      </Form.Item>
      <ModalAccessRequestToInbox
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
};
