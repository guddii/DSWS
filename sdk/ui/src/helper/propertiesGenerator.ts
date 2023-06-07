import { AbstractModel, IParsedProperty } from "solid";

interface IPropertiesGeneratorOptions {
  model: AbstractModel;
}

/**
 * Generates a list of parsed properties from a given model
 * @param options object containing the model
 * @returns generated properties array
 */
export const propertiesGenerator = ({
  model,
}: IPropertiesGeneratorOptions): Array<IParsedProperty> => {
  return model.values.map((entry) => {
    const property: IParsedProperty = {
      predicate: entry.predicate,
      properties: [entry.value],
      firstProperty: entry.value,
    };

    return property;
  });
};
