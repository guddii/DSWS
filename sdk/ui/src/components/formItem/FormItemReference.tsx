import { App, Button, Form, Input, Space } from "antd";
import {
  MessageTypes,
  checkResponse,
  schema,
  sendInboxMessage,
  toUrlString,
} from "solid";
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

      checkResponse(response);

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
    await sendInboxMessage({
      recipient: identity,
      sender: agent,
      messageType: MessageTypes.REQUEST_ACCESS_MESSAGE,
      data: {
        // TODO: find better subject than the user webId (also needs a refactor
        // of inbox as it currently only checks for webId subject for data)
        subject: identity.webId,
        entries: [
          {
            type: "url",
            predicate: schema.target,
            value: form.getFieldValue(property.predicate),
          },
        ],
      },
    });
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
