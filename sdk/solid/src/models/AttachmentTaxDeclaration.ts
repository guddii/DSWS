import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentTaxDeclarationFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentTaxDeclaration extends AbstractModel {
  static create(configuration?: AttachmentTaxDeclarationFactoryConfiguration) {
    switch (configuration) {
      case AttachmentTaxDeclarationFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentTaxDeclaration({
          values: [
            {
              predicate: createUrl(GOV.TaxDeclaration.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.TaxID.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentTaxDeclaration({
          values: [
            {
              predicate: createUrl(GOV.TaxDeclaration.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.TaxID.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
