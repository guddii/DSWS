import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentBuildingPermitFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentBuildingPermit extends AbstractModel {
  static create(configuration?: AttachmentBuildingPermitFactoryConfiguration) {
    switch (configuration) {
      case AttachmentBuildingPermitFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentBuildingPermit({
          values: [
            {
              predicate: createUrl(GOV.BuildingPermit.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.BuildingCompletion.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentBuildingPermit({
          values: [
            {
              predicate: createUrl(GOV.BuildingPermit.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.BuildingCompletion.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
