import { MESSAGE_TYPE, MessageTypes, getStringNoLocale } from "solid";
import { InboxMessageContent, InboxMessageHeader } from "./InboxMessageCard";
import { InboxMessageCardSaveButton } from "./InboxMessageCardSaveButton";
import { InboxMessageCardGrantAccessButton } from "./InboxMessageCardGrantAccessButton";

interface IInboxMessageCardActionButtonProperties {
  inboxMessageHeader?: InboxMessageHeader;
  inboxMessageContent?: InboxMessageContent;
  disabled?: boolean;
  onSuccess: () => void;
}

export const InboxMessageCardActionButton = ({
  inboxMessageHeader,
  inboxMessageContent,
  disabled,
  onSuccess,
}: IInboxMessageCardActionButtonProperties) => {
  if (!inboxMessageHeader) {
    return <span />;
  }

  const messageType = getStringNoLocale(inboxMessageHeader, MESSAGE_TYPE);
  if (!messageType) {
    return <span />;
  }

  if (messageType === MessageTypes.SAVE_TO_DATA_MESSAGE) {
    return (
      <InboxMessageCardSaveButton
        inboxMessageContent={inboxMessageContent}
        disabled={disabled}
        onSuccess={onSuccess}
      />
    );
  }

  if (messageType === MessageTypes.REQUEST_ACCESS_MESSAGE) {
    return (
      <InboxMessageCardGrantAccessButton
        inboxMessageContent={inboxMessageContent}
        disabled={disabled}
        onSuccess={onSuccess}
      />
    );
  }

  return <span />;
};
