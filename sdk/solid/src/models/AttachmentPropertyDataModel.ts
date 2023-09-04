import { AbstractModel } from "./AbstractModel";
import { createUrl } from "../helper/urlHelper";
import { GOV } from "../vocab/GOV";

export class AttachmentPropertyDataModel extends AbstractModel {
  static create() {
    return new AttachmentPropertyDataModel({
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
  }
}
