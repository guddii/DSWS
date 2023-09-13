import {
  SolidDataset,
  WebId,
  buildThing,
  createThing,
  setThing,
} from "@inrupt/solid-client";
import {
  IInboxMessageRecipient,
  IInboxMessageSender,
  IInboxMessageHeader,
  IInboxMessageType,
  MessageTypes,
  IInboxMessageData,
} from "./InboxMessage";
import {
  MESSAGE_TYPE,
  WEB_ID_TO_OFFICE_NAME_MAP,
  WEB_ID_TO_PROPERTY_MAP,
} from "../../config";
import { RDF } from "@inrupt/lit-generated-vocab-common";
import { schema } from "rdf-namespaces";
import { I18nKey, Locale, getTranslation } from "i18n/server";

const generateMessageText = async ({
  sender,
  messageType,
  locale,
}: IInboxMessageSender & IInboxMessageType & { locale: Locale }) => {
  const t = await getTranslation(locale);

  switch (messageType) {
    case MessageTypes.SAVE_TO_DATA_MESSAGE:
      return t(
        "sdk.solid.services.inbox.createInboxMessageHeader.saveToDataMessageText",
        t(WEB_ID_TO_PROPERTY_MAP[sender.webId] as I18nKey),
        t(WEB_ID_TO_OFFICE_NAME_MAP[sender.webId] as I18nKey)
      );
    case MessageTypes.REQUEST_ACCESS_MESSAGE:
      return t(
        "sdk.solid.services.inbox.createInboxMessageHeader.requestAccessMessageText"
      );
    default:
      return "";
  }
};

type ICreateMessageHeader = IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageType &
  IInboxMessageHeader &
  IInboxMessageData;

export const createInboxMessageHeader = async (
  dataset: SolidDataset,
  { recipient, sender, messageType, header, data }: ICreateMessageHeader
): Promise<SolidDataset> => {
  const messageHeader = buildThing(createThing({ url: header.target }))
    .addUrl(RDF.type, schema.Message)
    .addDatetime(schema.dateSent, header.date)
    .addUrl(schema.recipient, recipient.webId)
    .addUrl(schema.sender, sender.webId)
    .addStringNoLocale(MESSAGE_TYPE, messageType)
    .addStringWithLocale(
      schema.text,
      await generateMessageText({ sender, messageType, locale: "en" }),
      "en"
    )
    .addStringWithLocale(
      schema.text,
      await generateMessageText({ sender, messageType, locale: "de" }),
      "de"
    )
    .addUrl(schema.object, data.subject)
    .build();

  return setThing(dataset, messageHeader);
};
