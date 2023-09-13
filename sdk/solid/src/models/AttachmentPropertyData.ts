import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentPropertyDataFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentPropertyData extends AbstractModel {
  static create(configuration?: AttachmentPropertyDataFactoryConfiguration) {
    switch (configuration) {
      case AttachmentPropertyDataFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentPropertyData({
          values: [
            {
              predicate: createUrl(GOV.PropertyData.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.PropertyDataSize.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentPropertyData({
          values: [
            {
              predicate: createUrl(GOV.PropertyData.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.PropertyDataSize.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
