import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentVehicleRegistrationFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentVehicleRegistration extends AbstractModel {
  static create(
    configuration?: AttachmentVehicleRegistrationFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentVehicleRegistrationFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentVehicleRegistration({
          values: [
            {
              predicate: createUrl(GOV.VehicleRegistration.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.VehicleConstructionYear.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentVehicleRegistration({
          values: [
            {
              predicate: createUrl(GOV.VehicleRegistration.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.VehicleConstructionYear.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
