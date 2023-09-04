import { getStringNoLocale } from "../index";
import type { ThingPersisted } from "@inrupt/solid-client";

export const fillEmptyFields = (thing: ThingPersisted | null, form: any) => {
  const transform = (obj: any, arr: Array<string> = [], parent = "") => {
    if (!obj) return [];
    if (parent) parent = `${parent}.`;
    Object.keys(obj).forEach((key) => {
      const fullKey = `${parent}${key}`;
      if (obj[key] && typeof obj[key] === "object") {
        transform(obj[key], arr, fullKey);
      } else {
        arr.push(fullKey);
      }
    });
    return arr;
  };

  // Get an array of unchanged fields
  const arr = transform(form.getFieldsValue()).filter(
    (fullKey) => !form.isFieldTouched(fullKey)
  );

  // Get the final object with only changed keys
  const final = form.getFieldsValue(arr);

  // Fill form values
  Object.entries(final).forEach(([key]) => {
    // @ts-ignore
    const value = getStringNoLocale(thing, key);
    if (value) {
      form.setFieldValue(key, value);
    }
  });
};
