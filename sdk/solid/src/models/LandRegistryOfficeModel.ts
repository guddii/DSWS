import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { UrlString } from "@inrupt/solid-client";
import { createUrl } from "../helper/urlHelper";

interface ITaxOfficeModelFactoryOptions {
  subject: UrlString | URL;
}

export class LandRegistryOfficeModel extends AbstractModel {
  static create(options: ITaxOfficeModelFactoryOptions) {
    return new LandRegistryOfficeModel({
      subject: options.subject,
      values: [
        {
          predicate: createUrl(FOAF.firstName.iri.value),
          value: "",
        },
        {
          predicate: createUrl(FOAF.lastName.iri.value),
          value: "",
        },
      ],
    });
  }
}
