import { App, Button, Form, Input, Space } from "antd";
import { IRequestReferenceAccessBody, checkResponse, toUrlString } from "solid";
import { IParsedPropertyWithRulesAndOptions } from "../../helper/propertiesGenerator";
import { useCallback, useState } from "react";
import { ModalAccessRequestToInbox } from "../modals/ModalAccessRequestToInbox";
import { useIdentity } from "../../contexts/IdentityContext";
import { useAgent } from "../../contexts/AgentContext";

interface IFormItemProperties {
  property: IParsedPropertyWithRulesAndOptions;
  form: any;
}

export const FormItemReference = ({ property, form }: IFormItemProperties) => {
  const identity = useIdentity();
  const agent = useAgent();
  const { message } = App.useApp();
  const predicateString = toUrlString(property.predicate);
  const propertyName: string | undefined = predicateString.split("/").pop();
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
      message.error(error.message || "Error while fetching referenced data");
    } finally {
      setIsLoading(false);
    }
  }, [form, message, property.predicate]);

  /**
   * Sends an inbox message with a request to access the reference currently in the form item.
   */
  const onSubmit = async () => {
    if (!property?.options?.creator) {
      message.error(
        "No creator found for reference. Sending access request not possible"
      );
      return;
    }

    const requestBody: IRequestReferenceAccessBody = {
      requestor: agent.webId,
      owner: identity.webId,
      target: form.getFieldValue(property.predicate),
      access: { read: true },
    };

    const response: Response = await fetch(
      `${property.options.creator}/api/requestReferenceAccess`,
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
          <Button
            onClick={loadReference}
            loading={isLoading}
            type="primary"
            disabled={!form.getFieldValue(property.predicate)}
          >
            Load Data
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
