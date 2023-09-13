import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentBusinessPremisesPermitFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentBusinessPremisesPermit extends AbstractModel {
  static create(
    configuration?: AttachmentBusinessPremisesPermitFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentBusinessPremisesPermitFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentBusinessPremisesPermit({
          values: [
            {
              predicate: createUrl(GOV.BusinessPremisesPermit.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(
                GOV.BusinessPremisesInspectionInterval.value
              ),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentBusinessPremisesPermit({
          values: [
            {
              predicate: createUrl(GOV.BusinessPremisesPermit.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(
                GOV.BusinessPremisesInspectionInterval.value
              ),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
