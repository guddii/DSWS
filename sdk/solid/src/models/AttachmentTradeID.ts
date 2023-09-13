import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentTradeIDFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentTradeID extends AbstractModel {
  static create(configuration?: AttachmentTradeIDFactoryConfiguration) {
    switch (configuration) {
      case AttachmentTradeIDFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentTradeID({
          values: [
            {
              predicate: createUrl(GOV.TradeLicence.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.TradeID.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentTradeID({
          values: [
            {
              predicate: createUrl(GOV.TradeLicence.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.TradeID.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
