import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { UrlString } from "@inrupt/solid-client";
import { createUrl } from "../helper/urlHelper";

interface ITaxOfficeModelFactoryOptions {
  subject: UrlString | URL;
}

export class TaxOfficeModel extends AbstractModel {
  static create(options: ITaxOfficeModelFactoryOptions) {
    return new TaxOfficeModel({
      subject: options.subject,
      values: [
        {
          predicate: createUrl(FOAF.name.iri.value),
          value: "",
        },
        {
          predicate: createUrl(FOAF.firstName.iri.value),
          value: "",
        },
        {
          predicate: createUrl(FOAF.lastName.iri.value),
          value: "",
        },
        {
          predicate: createUrl(FOAF.title.iri.value),
          value: "",
        },
        {
          predicate: createUrl(FOAF.homepage.iri.value),
          value: "",
        },
      ],
    });
  }
}
