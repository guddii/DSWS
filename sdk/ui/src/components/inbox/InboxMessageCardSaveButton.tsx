import { Button, App } from "antd";
import {
  STAMMDATEN_FILE_PATH,
  Thing,
  asUrl,
  createUrl,
  getSolidDataset,
  getThing,
  getUrl,
  mergeThings,
  saveSolidDatasetAt,
  schema,
  setThing,
  toUrlString,
} from "solid";
import { InboxContent, InboxMessage } from "./InboxMessageCard";
import { useSession } from "@inrupt/solid-ui-react";
import { useIdentity } from "../../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

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
  const t = useTranslation();
  const { message } = App.useApp();
  const { session } = useSession();
  const { storage } = useIdentity();

  const onClick = async () => {
    try {
      if (!inboxMessage || !inboxContent) {
        throw new Error();
      }

      const datasetUrl = toUrlString(createUrl(STAMMDATEN_FILE_PATH, storage));
      const dataset = await getSolidDataset(datasetUrl, {
        fetch: session.fetch,
      });

      let thingToAdd: Thing = inboxContent;
      const existingThing = getThing(dataset, asUrl(inboxContent));
      if (existingThing) {
        thingToAdd = mergeThings(existingThing, inboxContent);
      }
      const updatedDataset = setThing(dataset, thingToAdd);

      await saveSolidDatasetAt(datasetUrl, updatedDataset, {
        fetch: session.fetch,
      });

      message.success(
        t("sdk.ui.components.inbox.InboxMessageCardSaveButton.success")
      );
      onSuccess();
    } catch (error: any) {
      message.error(
        error.message ||
          t("sdk.ui.components.inbox.InboxMessageCardSaveButton.success")
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
      {t("_.save")}
    </Button>
  );
};
