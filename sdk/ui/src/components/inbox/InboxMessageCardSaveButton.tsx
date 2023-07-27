import { Button, message as antMessage } from "antd";
import { getUrl, schema } from "solid";
import { Content, Message } from "./InboxMessageCard";

interface IInboxMessageCardSaveButtonProperties {
  message?: Message;
  content?: Content;
  disabled?: boolean;
}

export const InboxMessageCardSaveButton = ({
  message,
  content,
  disabled,
}: IInboxMessageCardSaveButtonProperties) => {
  return (
    <Button
      onClick={() =>
        antMessage.info("Save to data functionality not yet implemented")
      }
      disabled={
        !message || !content || !getUrl(content, schema.subjectOf) || disabled
      }
    >
      Save To Data
    </Button>
  );
};
