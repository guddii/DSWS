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
  LAND_REGISTRY_OFFICE_WEB_ID,
  MESSAGE_TYPE,
  TAX_OFFICE_WEB_ID,
} from "../../config";
import { RDF } from "@inrupt/lit-generated-vocab-common";
import { schema } from "rdf-namespaces";

const agentTextsEnglish: Record<
  WebId,
  { dataName: string; officeName: string }
> = {
  [TAX_OFFICE_WEB_ID]: {
    dataName: "Property Tax Return",
    officeName: "Tax Office",
  },
  [LAND_REGISTRY_OFFICE_WEB_ID]: {
    dataName: "Land Register Surveys",
    officeName: "Land Registry Office",
  },
};

const generateMessageTextEnglish = ({
  sender,
  messageType,
}: IInboxMessageSender & IInboxMessageType) => {
  switch (messageType) {
    case MessageTypes.SAVE_TO_DATA_MESSAGE:
      return `Your ${
        agentTextsEnglish[sender.webId].dataName
      } has been uploaded to your pod at the ${
        agentTextsEnglish[sender.webId].officeName
      }.`;
    case MessageTypes.REQUEST_ACCESS_MESSAGE:
      return "To access a data reference in you data vault access permission is required.";
    default:
      return "";
  }
};

const agentTextsGerman: Record<
  WebId,
  { dataName: string; officeName: string }
> = {
  [TAX_OFFICE_WEB_ID]: {
    dataName: "Grundsteuererklärung",
    officeName: "Finanzamt",
  },
  [LAND_REGISTRY_OFFICE_WEB_ID]: {
    dataName: "Grundbuchvermessungen",
    officeName: "Katasteramt",
  },
};

const generateMessageTextGerman = ({
  sender,
  messageType,
}: IInboxMessageSender & IInboxMessageType) => {
  switch (messageType) {
    case MessageTypes.SAVE_TO_DATA_MESSAGE:
      return `Ihre ${
        agentTextsGerman[sender.webId].dataName
      } sind in Ihren Pod beim ${
        agentTextsGerman[sender.webId].officeName
      } hochgeladen worden.`;
    case MessageTypes.REQUEST_ACCESS_MESSAGE:
      return "Für den Zugriff auf eine Datenreferenz in Ihrem Datentresor ist eine Zugriffsberechtigung erforderlich.";
    default:
      return "";
  }
};

type ICreateMessageHeader = IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageType &
  IInboxMessageHeader &
  IInboxMessageData;

export const createInboxMessageHeader = (
  dataset: SolidDataset,
  { recipient, sender, messageType, header, data }: ICreateMessageHeader
): SolidDataset => {
  const messageHeader = buildThing(createThing({ url: header.target }))
    .addUrl(RDF.type, schema.Message)
    .addDatetime(schema.dateSent, header.date)
    .addUrl(schema.recipient, recipient.webId)
    .addUrl(schema.sender, sender.webId)
    .addStringNoLocale(MESSAGE_TYPE, messageType)
    .addStringWithLocale(
      schema.text,
      generateMessageTextEnglish({ sender, messageType }),
      "en"
    )
    .addStringWithLocale(
      schema.text,
      generateMessageTextGerman({ sender, messageType }),
      "de"
    )
    .addUrl(schema.object, data.subject)
    .build();

  return setThing(dataset, messageHeader);
};
