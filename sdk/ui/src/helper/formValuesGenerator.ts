import { IParsedProperty, UrlString, toUrlString } from "solid";

interface IFormValuesGeneratorOptions {
  properties: Array<IParsedProperty>;
}

/**
 * Generates a form values object from parsed properties with the predicate as key and the firstProperty as value.
 * @param options object containing the properties array
 * @returns generated form values object
 */
export const formValuesGenerator = ({
  properties,
}: IFormValuesGeneratorOptions): Record<UrlString, string> => {
  const propertyValues: Record<UrlString, string> = {};
  properties.forEach((property) => {
    propertyValues[toUrlString(property.predicate)] = property.firstProperty;
  });

  return propertyValues;
};
