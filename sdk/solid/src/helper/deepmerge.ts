import merge from "deepmerge";

const arrayMerge = <T>(array1: Array<T>, array2: Array<T>) => {
  const mergedSet = new Set(array1);

  array2.forEach((item) => mergedSet.add(item));

  return Array.from(mergedSet);
};

export const deepmerge = <T>(object1: Partial<T>, object2: Partial<T>): T =>
  merge(object1, object2, { arrayMerge });
