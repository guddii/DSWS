import { IInboxMessageConfig, IInboxMessageRecipient } from "./InboxMessage";
import { INBOX_FOLDER_PATH } from "../../config";
import { removeFilename, toUrlString } from "../../helper/urlHelper";

/**
 * Creates all URLs needed for inbox message creation
 * @param recipient
 */
export const createInboxMessageConfig = ({
  recipient,
}: IInboxMessageRecipient): IInboxMessageConfig => {
  const date = new Date();
  const filename = `${date.getTime()}.ttl`;
  const target = [recipient.storage, INBOX_FOLDER_PATH, filename].join("");
  const container = toUrlString(removeFilename(target) + "/");

  return { config: { date, filename, target, container } };
};
