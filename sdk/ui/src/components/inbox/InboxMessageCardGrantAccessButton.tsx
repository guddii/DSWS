import { Button, App, Space } from "antd";
import {
  DCTERMS,
  IGrantReferenceAccessBody,
  checkResponse,
  getUrl,
  schema,
} from "solid";
import { InboxMessageContent } from "./InboxMessageCard";
import { useState } from "react";

interface IInboxMessageCardGrantAccessButtonProperties {
  inboxMessageContent?: InboxMessageContent;
  disabled?: boolean;
  onSuccess: () => void;
}

export const InboxMessageCardGrantAccessButton = ({
  inboxMessageContent,
  disabled,
  onSuccess,
}: IInboxMessageCardGrantAccessButtonProperties) => {
  const { message } = App.useApp();
  const [isLoadingGrant, setIsLoadingGrant] = useState(false);
  const [isLoadingDeny, setIsLoadingDeny] = useState(false);

  const processAccessRequest = async (granted: boolean) => {
    try {
      if (!inboxMessageContent) {
        throw new Error();
      }

      const requestUrl = getUrl(inboxMessageContent, schema.identifier);
      if (!requestUrl) {
        throw new Error();
      }
      const serviceProvider = getUrl(inboxMessageContent, DCTERMS.mediator);
      if (!serviceProvider) {
        throw new Error();
      }

      const requestBody: IGrantReferenceAccessBody = {
        request: requestUrl,
        granted,
      };

      const response: Response = await fetch(serviceProvider, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      await checkResponse(response);

      message.success(
        `Successfully ${granted ? "granted" : "denied"} access permission.`
      );
      onSuccess();
    } catch (error: any) {
      message.error(
        error.message || "Some necessary data is missing in message."
      );
      console.error(error);
    }
  };

  const onClickGrant = async () => {
    setIsLoadingGrant(true);
    await processAccessRequest(true);
    setIsLoadingGrant(false);
  };
  const onClickDeny = async () => {
    setIsLoadingDeny(true);
    await processAccessRequest(false);
    setIsLoadingDeny(false);
  };

  return (
    <Space.Compact>
      <Button
        onClick={onClickDeny}
        disabled={!inboxMessageContent || disabled || isLoadingGrant}
        loading={isLoadingDeny}
      >
        Deny Access
      </Button>
      <Button
        onClick={onClickGrant}
        disabled={!inboxMessageContent || disabled || isLoadingDeny}
        loading={isLoadingGrant}
      >
        Grant Access
      </Button>
    </Space.Compact>
  );
};
