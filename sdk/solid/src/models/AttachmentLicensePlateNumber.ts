import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentLicensePlateNumberFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentLicensePlateNumber extends AbstractModel {
  static create(
    configuration?: AttachmentLicensePlateNumberFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentLicensePlateNumberFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentLicensePlateNumber({
          values: [
            {
              predicate: createUrl(GOV.LicensePlate.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.LicensePlateNumber.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentLicensePlateNumber({
          values: [
            {
              predicate: createUrl(GOV.LicensePlate.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.LicensePlateNumber.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
