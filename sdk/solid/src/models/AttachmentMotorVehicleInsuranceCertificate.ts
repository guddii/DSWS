import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "vocab";

export enum AttachmentMotorVehicleInsuranceCertificateFactoryConfiguration {
  AS_OPTIONAL = "AS_OPTIONAL",
}

export class AttachmentMotorVehicleInsuranceCertificate extends AbstractModel {
  static create(
    configuration?: AttachmentMotorVehicleInsuranceCertificateFactoryConfiguration
  ) {
    switch (configuration) {
      case AttachmentMotorVehicleInsuranceCertificateFactoryConfiguration.AS_OPTIONAL:
        return new AttachmentMotorVehicleInsuranceCertificate({
          values: [
            {
              predicate: createUrl(GOV.MotorVehicleInsuranceCertificate.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.MotorVehicleInsuranceID.value),
              value: "",
            },
          ],
        });
      default:
        return new AttachmentMotorVehicleInsuranceCertificate({
          values: [
            {
              predicate: createUrl(GOV.MotorVehicleInsuranceCertificate.value),
              value: "",
              options: { reference: true },
            },
            {
              predicate: createUrl(GOV.MotorVehicleInsuranceID.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
