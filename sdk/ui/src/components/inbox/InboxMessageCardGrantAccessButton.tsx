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
import { useTranslation } from "i18n/client";

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
  const t = useTranslation();
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
        granted
          ? t(
              "sdk.ui.components.inbox.InboxMessageCardGrantAccessButton.success.granted"
            )
          : t(
              "sdk.ui.components.inbox.InboxMessageCardGrantAccessButton.success.denied"
            )
      );
      onSuccess();
    } catch (error: any) {
      message.error(
        (error.message && t(error.message)) ||
          t("sdk.ui.components.inbox.InboxMessageCardGrantAccessButton.error")
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
        {t("_.deny")}
      </Button>
      <Button
        onClick={onClickGrant}
        disabled={!inboxMessageContent || disabled || isLoadingDeny}
        loading={isLoadingGrant}
      >
        {t("_.grant")}
      </Button>
    </Space.Compact>
  );
};
