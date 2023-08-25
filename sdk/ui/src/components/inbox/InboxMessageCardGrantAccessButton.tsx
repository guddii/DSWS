import { Button, App } from "antd";
import { getUrl, schema, universalAccess } from "solid";
import { InboxContent, InboxMessage } from "./InboxMessageCard";
import { useSession } from "@inrupt/solid-ui-react";

interface IInboxMessageCardGrantAccessButtonProperties {
  inboxMessage: InboxMessage;
  inboxContent?: InboxContent;
  disabled?: boolean;
  onSuccess: () => void;
}

export const InboxMessageCardGrantAccessButton = ({
  inboxMessage,
  inboxContent,
  disabled,
  onSuccess,
}: IInboxMessageCardGrantAccessButtonProperties) => {
  const { message } = App.useApp();
  const { session } = useSession();

  const onClick = async () => {
    try {
      if (!inboxContent) {
        throw new Error();
      }

      const senderWebId = getUrl(inboxMessage, schema.sender);
      if (!senderWebId) {
        throw new Error();
      }

      const targetUrl = getUrl(inboxContent, schema.target);
      if (!targetUrl) {
        throw new Error();
      }

      const grantedAccessPermissions = await universalAccess.setAgentAccess(
        targetUrl,
        senderWebId,
        { read: true },
        { fetch: session.fetch }
      );
      if (grantedAccessPermissions == null) {
        throw new Error("Granting access permissions failed.");
      }

      message.success("Successfully granted message sender access permission.");
      onSuccess();
    } catch (error: any) {
      message.error(
        error.message || "Some necessary data is missing in message."
      );
      console.error(error);
    }
  };

  return (
    <Button onClick={onClick} disabled={!inboxContent || disabled}>
      Grant Access
    </Button>
  );
};
