import { VCARD } from "@inrupt/lit-generated-vocab-common";
import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "../vocab/GOV";

export class TaxOfficeModel extends AbstractModel {
  static create() {
    return new TaxOfficeModel({
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
          predicate: createUrl(VCARD.locality.iri.value),
          value: "",
          rules: { required: true },
        },
        {
          predicate: createUrl(GOV.TradeID.value),
          value: "",
        },
        {
          predicate: createUrl(GOV.PropertyData.value),
          value: "",
          options: { reference: true },
        },
        {
          predicate: createUrl(GOV.PropertyDataSize.value),
          value: "",
        },
        {
          predicate: createUrl(GOV.CreditNotice.value),
          value: "",
        },
        {
          predicate: createUrl(GOV.ParentalBenefitNotice.value),
          value: "",
        },
      ],
    });
  }
}
