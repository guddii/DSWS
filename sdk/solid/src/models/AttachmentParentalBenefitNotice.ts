import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentParentalBenefitNoticeFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentParentalBenefitNotice extends AbstractModel {
  static create(
    configuration?: AttachmentParentalBenefitNoticeFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentParentalBenefitNoticeFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentParentalBenefitNotice({
          values: [
            {
              predicate: createUrl(GOV.ParentalBenefitNotice.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.ParentalBenefitAmount.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentParentalBenefitNotice({
          values: [
            {
              predicate: createUrl(GOV.ParentalBenefitNotice.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.ParentalBenefitAmount.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
