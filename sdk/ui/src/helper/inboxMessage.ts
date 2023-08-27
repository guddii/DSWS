import { Thing, getSourceUrl, getThing } from "solid";
import { InboxMessage } from "../components/inbox/InboxMessageCard";

export const getInboxMessageHeader = (
  inboxMessage: InboxMessage
): Thing | null => {
  return getThing(inboxMessage, getSourceUrl(inboxMessage));
};

export const getInboxMessageContent = (
  inboxMessage: InboxMessage,
  subject: string
): Thing | null => {
  return getThing(inboxMessage, subject);
};
