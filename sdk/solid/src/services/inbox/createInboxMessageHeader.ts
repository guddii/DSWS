import { SolidDataset } from "@inrupt/solid-client";
import { buildThing, createThing, RDF, schema, setThing } from "../../index";
import {
  IInboxMessageRecipient,
  IInboxMessageSender,
  IInboxMessageHeader,
} from "./InboxMessage";

type ICreateMessageHeader = IInboxMessageRecipient &
  IInboxMessageSender &
  IInboxMessageHeader;

export const createInboxMessageHeader = (
  dataset: SolidDataset,
  { recipient, sender, header }: ICreateMessageHeader
): SolidDataset => {
  const text = "Your Tax Data has been uploaded to your Pod at the Tax Office";

  const messageHeader = buildThing(createThing({ url: header.target }))
    .addUrl(RDF.type, schema.Message)
    .addDatetime(schema.dateSent, header.date)
    .addUrl(schema.recipient, recipient.webId)
    .addUrl(schema.sender, sender.webId)
    .addStringNoLocale(schema.text, text)
    .build();

  return setThing(dataset, messageHeader);
};
