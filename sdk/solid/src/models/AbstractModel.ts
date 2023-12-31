import { UrlString } from "@inrupt/solid-client";

type AbstractModelValue = string;

interface IAbstractModelValues {
  predicate: URL;
  value: AbstractModelValue;
  rules?: {
    required: boolean;
  };
  options?: {
    reference?: boolean;
    creator?: UrlString;
  };
}

interface IAbstractModelOptions {
  values?: Array<IAbstractModelValues>;
}

export abstract class AbstractModel {
  values: Array<IAbstractModelValues>;

  constructor(options: IAbstractModelOptions) {
    this.values = options.values ?? [];
  }
}
