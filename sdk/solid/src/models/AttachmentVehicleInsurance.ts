import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentVehicleInsuranceFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentVehicleInsurance extends AbstractModel {
  static create(
    configuration?: AttachmentVehicleInsuranceFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentVehicleInsuranceFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentVehicleInsurance({
          values: [
            {
              predicate: createUrl(GOV.VehicleInsurance.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.VehicleInsuranceID.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentVehicleInsurance({
          values: [
            {
              predicate: createUrl(GOV.VehicleInsurance.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.VehicleInsuranceID.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
