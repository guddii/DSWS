import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { VCARD } from "@inrupt/lit-generated-vocab-common";

export enum MainFormFactoryConfiguration {
  WITH_LOCALITY = "WITH_LOCALITY",
}

export class MainForm extends AbstractModel {
  static create(configuration?: MainFormFactoryConfiguration) {
    switch (configuration) {
      case MainFormFactoryConfiguration.WITH_LOCALITY:
        return new MainForm({
          values: [
            {
              predicate: createUrl(VCARD.given_name.iri.value),
              value: "",
              rules: { required: true },
            },
            {
              predicate: createUrl(VCARD.family_name.iri.value),
              value: "",
              rules: { required: true },
            },
            {
              predicate: createUrl(VCARD.locality.iri.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
      default:
        return new MainForm({
          values: [
            {
              predicate: createUrl(VCARD.given_name.iri.value),
              value: "",
              rules: { required: true },
            },
            {
              predicate: createUrl(VCARD.family_name.iri.value),
              value: "",
              rules: { required: true },
            },
          ],
        });
    }
  }
}
