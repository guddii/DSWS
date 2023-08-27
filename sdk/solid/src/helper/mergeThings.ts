import { Thing } from "@inrupt/solid-client";
import { deepmerge } from "./deepmerge";

export const mergeThings = (thing1: Thing, thing2: Thing): Thing => {
  return deepmerge(thing1, thing2);
};
