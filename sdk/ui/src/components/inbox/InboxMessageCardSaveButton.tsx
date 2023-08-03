import { Button, message } from "antd";
import { getUrl, schema } from "solid";
import { InboxContent, InboxMessage } from "./InboxMessageCard";

interface IInboxMessageCardSaveButtonProperties {
  inboxMessage?: InboxMessage;
  inboxContent?: InboxContent;
  disabled?: boolean;
}

export const InboxMessageCardSaveButton = ({
  inboxMessage,
  inboxContent,
  disabled,
}: IInboxMessageCardSaveButtonProperties) => {
  return (
    <Button
      onClick={() =>
        message.info("Save to data functionality not yet implemented")
      }
      disabled={
        !inboxMessage ||
        !inboxContent ||
        !getUrl(inboxContent, schema.subjectOf) ||
        disabled
      }
    >
      Save To Data
    </Button>
  );
};
