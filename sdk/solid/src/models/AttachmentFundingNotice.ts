import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentFundingNoticeFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentFundingNotice extends AbstractModel {
  static create(configuration?: AttachmentFundingNoticeFactoryConfiguration) {
    switch (configuration) {
      case AttachmentFundingNoticeFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentFundingNotice({
          values: [
            {
              predicate: createUrl(GOV.FundingNotice.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.FundingGrant.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentFundingNotice({
          values: [
            {
              predicate: createUrl(GOV.FundingNotice.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.FundingGrant.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
