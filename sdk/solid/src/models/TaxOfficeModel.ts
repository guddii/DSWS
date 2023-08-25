import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { HAS_LAND_REGISTRY_DATA } from "../config";

export class TaxOfficeModel extends AbstractModel {
  static create() {
    return new TaxOfficeModel({
      values: [
        {
          predicate: createUrl(FOAF.firstName.iri.value),
          value: "",
          rules: { required: true },
        },
        {
          predicate: createUrl(FOAF.lastName.iri.value),
          value: "",
          rules: { required: true },
        },
        {
          predicate: createUrl(FOAF.title.iri.value),
          value: "",
        },
        {
          predicate: createUrl(FOAF.homepage.iri.value),
          value: "",
        },
        {
          predicate: createUrl(HAS_LAND_REGISTRY_DATA),
          value: "",
          options: { reference: true },
        },
      ],
    });
  }
}
