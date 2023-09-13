import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentIdentityCardFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}
export class AttachmentIdentityCard extends AbstractModel {
  static create(configuration?: AttachmentIdentityCardFactoryConfiguration) {
    switch (configuration) {
      case AttachmentIdentityCardFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentIdentityCard({
          values: [
            {
              predicate: createUrl(GOV.IdentityCard.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.IdentityCardNumber.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentIdentityCard({
          values: [
            {
              predicate: createUrl(GOV.IdentityCard.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.IdentityCardNumber.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
