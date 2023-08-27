import { Button, App } from "antd";
import {
  STAMMDATEN_FILE_PATH,
  Thing,
  asUrl,
  createUrl,
  getSolidDataset,
  getThing,
  mergeThings,
  saveSolidDatasetAt,
  setThing,
  toUrlString,
} from "solid";
import { InboxMessageContent } from "./InboxMessageCard";
import { useSession } from "@inrupt/solid-ui-react";
import { useIdentity } from "../../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

export interface IInboxMessageCardSaveButtonProperties {
  inboxMessageContent?: InboxMessageContent;
  disabled?: boolean;
  onSuccess: () => void;
}

export const InboxMessageCardSaveButton = ({
  inboxMessageContent,
  disabled,
  onSuccess,
}: IInboxMessageCardSaveButtonProperties) => {
  const t = useTranslation();
  const { message } = App.useApp();
  const { session } = useSession();
  const { storage } = useIdentity();

  const onClick = async () => {
    try {
      if (!inboxMessageContent) {
        throw new Error();
      }

      const datasetUrl = toUrlString(createUrl(STAMMDATEN_FILE_PATH, storage));
      const dataset = await getSolidDataset(datasetUrl, {
        fetch: session.fetch,
      });

      let thingToAdd: Thing = inboxMessageContent;
      const existingThing = getThing(dataset, asUrl(inboxMessageContent));
      if (existingThing) {
        thingToAdd = mergeThings(existingThing, inboxMessageContent);
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
    <Button onClick={onClick} disabled={!inboxMessageContent || disabled}>
      {t("_.save")}
    </Button>
  );
};
