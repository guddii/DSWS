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

export interface IInboxMessageData {
  data: {
    reference: UrlString;
  };
}

export interface IInboxMessageHeader {
  header: {
    date: Date;
    target: UrlString;
  };
}

export interface IInboxMessageConfig {
  config: {
    date: Date;
    filename: string;
    target: UrlString;
    container: UrlString;
  };
}
