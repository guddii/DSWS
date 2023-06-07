import { UrlString } from "@inrupt/solid-client";

type AbstractModelValue = string;

interface IAbstractModelValues {
  predicate: URL;
  value: AbstractModelValue;
}

interface IAbstractModelOptions {
  subject: UrlString | URL;
  values?: Array<IAbstractModelValues>;
}

export abstract class AbstractModel {
  subject: UrlString | URL;
  values: Array<IAbstractModelValues>;

  constructor(options: IAbstractModelOptions) {
    this.subject = options.subject;
    this.values = options.values ?? [];
  }
}
