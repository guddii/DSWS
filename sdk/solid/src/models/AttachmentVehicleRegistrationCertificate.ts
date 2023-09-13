import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentVehicleRegistrationCertificateFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentVehicleRegistrationCertificate extends AbstractModel {
  static create(
    configuration?: AttachmentVehicleRegistrationCertificateFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentVehicleRegistrationCertificateFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentVehicleRegistrationCertificate({
          values: [
            {
              predicate: createUrl(GOV.VehicleRegistrationCertificate.value),
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
        return new AttachmentVehicleRegistrationCertificate({
          values: [
            {
              predicate: createUrl(GOV.VehicleRegistrationCertificate.value),
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
