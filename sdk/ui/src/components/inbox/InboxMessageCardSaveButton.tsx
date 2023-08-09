import { Button, message } from "antd";
import {
  SENDER_TO_PROPERTY_MAP,
  STAMMDATEN_FILE_PATH,
  UrlString,
  buildThing,
  createUrl,
  getSolidDataset,
  getThing,
  getUrl,
  saveSolidDatasetAt,
  schema,
  setThing,
  toUrlString,
} from "solid";
import { InboxContent, InboxMessage } from "./InboxMessageCard";
import { useSession } from "@inrupt/solid-ui-react";
import { useIdentity } from "../../contexts/IdentityContext";

interface IInboxMessageCardSaveButtonProperties {
  inboxMessage?: InboxMessage;
  inboxContent?: InboxContent;
  disabled?: boolean;
  onSuccess: () => void;
}

export const InboxMessageCardSaveButton = ({
  inboxMessage,
  inboxContent,
  disabled,
  onSuccess,
}: IInboxMessageCardSaveButtonProperties) => {
  const { session } = useSession();
  const { storage } = useIdentity();

  const onClick = async () => {
    try {
      if (!inboxMessage || !inboxContent) {
        throw new Error();
      }

      const sender = getUrl(inboxMessage, schema.sender);
      const referenceUrl = getUrl(inboxContent, schema.subjectOf);
      if (
        !sender ||
        !referenceUrl ||
        !SENDER_TO_PROPERTY_MAP.hasOwnProperty(sender)
      ) {
        throw new Error();
      }
      const predicate: UrlString = SENDER_TO_PROPERTY_MAP[sender];

      const datasetUrl = toUrlString(createUrl(STAMMDATEN_FILE_PATH, storage));
      const dataset = await getSolidDataset(datasetUrl, {
        fetch: session.fetch,
      });

      let thing = getThing(dataset, `${datasetUrl}#me`);
      if (!thing) {
        throw new Error();
      }

      const updatedThing = buildThing(thing)
        .addUrl(predicate, referenceUrl)
        .build();
      const updatedDataset = setThing(dataset, updatedThing);

      await saveSolidDatasetAt(datasetUrl, updatedDataset, {
        fetch: session.fetch,
      });

      message.success("Successfully saved message data to stammdaten.");
      onSuccess();
    } catch (error: any) {
      message.error(
        error.message || "Some necessary data is missing in message."
      );
      console.error(error);
    }
  };

  return (
    <Button
      onClick={onClick}
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
