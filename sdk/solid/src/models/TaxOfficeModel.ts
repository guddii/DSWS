import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { UrlString } from "@inrupt/solid-client";

interface ITaxOfficeModelFactoryOptions {
  subject: UrlString | URL;
}

export class TaxOfficeModel extends AbstractModel {
  static create(options: ITaxOfficeModelFactoryOptions) {
    return new TaxOfficeModel({
      subject: options.subject,
      values: [
        {
          predicate: new URL(FOAF.name.iri.value),
          value: "",
        },
        {
          predicate: new URL(FOAF.firstName.iri.value),
          value: "",
        },
        {
          predicate: new URL(FOAF.lastName.iri.value),
          value: "",
        },
        {
          predicate: new URL(FOAF.title.iri.value),
          value: "",
        },
        {
          predicate: new URL(FOAF.homepage.iri.value),
          value: "",
        },
      ],
    });
  }
}
