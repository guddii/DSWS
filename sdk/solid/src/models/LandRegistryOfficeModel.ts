import { VCARD } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "../vocab/GOV";

export class LandRegistryOfficeModel extends AbstractModel {
  static create() {
    return new LandRegistryOfficeModel({
      values: [
        {
          predicate: createUrl(VCARD.given_name.iri.value),
          value: "",
          rules: { required: true },
        },
        {
          predicate: createUrl(VCARD.family_name.iri.value),
          value: "",
          rules: { required: true },
        },
        {
          predicate: createUrl(GOV.IdentityCardNumber.value),
          value: "",
          rules: { required: true },
        },
        {
          predicate: createUrl(GOV.BusinessPremisesPermit.value),
          value: "",
        },
      ],
    });
  }
}
