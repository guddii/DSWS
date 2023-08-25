import { MESSAGE_TYPE, MessageTypes, getStringNoLocale } from "solid";
import { InboxContent, InboxMessage } from "./InboxMessageCard";
import { InboxMessageCardSaveButton } from "./InboxMessageCardSaveButton";
import { InboxMessageCardGrantAccessButton } from "./InboxMessageCardGrantAccessButton";

interface IInboxMessageCardActionButtonProperties {
  inboxMessage?: InboxMessage;
  inboxContent?: InboxContent;
  disabled?: boolean;
  onSuccess: () => void;
}

export const InboxMessageCardActionButton = ({
  inboxMessage,
  inboxContent,
  disabled,
  onSuccess,
}: IInboxMessageCardActionButtonProperties) => {
  if (!inboxMessage) {
    return <span />;
  }

  const messageType = getStringNoLocale(inboxMessage, MESSAGE_TYPE);
  if (!messageType) {
    return <span />;
  }

  if (messageType === MessageTypes.SAVE_TO_DATA_MESSAGE) {
    return (
      <InboxMessageCardSaveButton
        inboxContent={inboxContent}
        disabled={disabled}
        onSuccess={onSuccess}
      />
    );
  }

  if (messageType === MessageTypes.REQUEST_ACCESS_MESSAGE) {
    return (
      <InboxMessageCardGrantAccessButton
        inboxMessage={inboxMessage}
        inboxContent={inboxContent}
        disabled={disabled}
        onSuccess={onSuccess}
      />
    );
  }

  return <span />;
};
