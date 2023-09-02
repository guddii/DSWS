import { UrlString, WebId } from "@inrupt/solid-client";

export interface IInboxMessageRecipient {
  recipient: {
    webId: WebId;
    storage: UrlString;
  };
}

export interface IInboxMessageSender {
  sender: {
    webId: WebId;
  };
}

export interface IInboxMessageDataEntry {
  type: string;
  predicate: string;
  value: any;
}

export interface IInboxMessageData {
  data: {
    subject: UrlString;
    entries: Array<IInboxMessageDataEntry>;
  };
}

export interface IInboxMessageHeader {
  header: {
    date: Date;
    target: UrlString;
  };
}

export enum MessageTypes {
  SAVE_TO_DATA_MESSAGE = "saveToDataMessage",
  REQUEST_ACCESS_MESSAGE = "requestAccessMessage",
}

export interface IInboxMessageType {
  messageType: MessageTypes;
}

export interface IInboxMessageConfig {
  config: {
    date: Date;
    filename: string;
    target: UrlString;
    container: UrlString;
  };
}
