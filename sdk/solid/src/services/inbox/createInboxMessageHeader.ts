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

const agentTexts: Record<WebId, { dataName: string; officeName: string }> = {
  [TAX_OFFICE_WEB_ID]: {
    dataName: "tax data",
    officeName: "tax office",
  },
  [LAND_REGISTRY_OFFICE_WEB_ID]: {
    dataName: "land registry data",
    officeName: "land registry office",
  },
};

const generateMessageText = ({
  sender,
  messageType,
}: IInboxMessageSender & IInboxMessageType) => {
  switch (messageType) {
    case MessageTypes.SAVE_TO_DATA_MESSAGE:
      return `Your ${
        agentTexts[sender.webId].dataName
      } has been uploaded to your pod at the ${
        agentTexts[sender.webId].officeName
      }.`;
    case MessageTypes.REQUEST_ACCESS_MESSAGE:
      return "To access a data reference in you data vault access permission is required.";
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
    .addStringNoLocale(
      schema.text,
      generateMessageText({ sender, messageType })
    )
    .addUrl(schema.object, data.subject)
    .build();

  return setThing(dataset, messageHeader);
};
