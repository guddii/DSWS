import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";

export class LandRegistryOfficeModel extends AbstractModel {
  static create() {
    return new LandRegistryOfficeModel({
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
