import { AbstractModel, getStringNoLocale, toUrlString } from "../index";
import type { ThingPersisted } from "@inrupt/solid-client";

export const fillModalFields = (
  thing: ThingPersisted,
  form: any,
  model: AbstractModel
) => {
  model.values.forEach(({ predicate }) => {
    const predicateString = toUrlString(predicate);

    const value = getStringNoLocale(thing, predicateString);

    if (value) {
      form.setFieldValue(predicateString, value);
    }
  });
};
