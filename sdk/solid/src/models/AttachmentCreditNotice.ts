import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentCreditNoticeFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentCreditNotice extends AbstractModel {
  static create(configuration?: AttachmentCreditNoticeFactoryConfiguration) {
    switch (configuration) {
      case AttachmentCreditNoticeFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentCreditNotice({
          values: [
            {
              predicate: createUrl(GOV.CreditNotice.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.CreditAmount.value),
              value: "",
            },
            {
              predicate: createUrl(GOV.CreditPeriod.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentCreditNotice({
          values: [
            {
              predicate: createUrl(GOV.CreditNotice.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.CreditAmount.value),
              value: "",
              rules: { required: true },
            },
            {
              predicate: createUrl(GOV.CreditPeriod.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
