import { AbstractModel, IParsedProperty } from "solid";

interface IPropertiesGeneratorOptions {
  model: AbstractModel;
}

export interface IParsedPropertyRules {
  required: boolean;
}

export interface IParsedPropertyWithRules extends IParsedProperty {
  rules?: IParsedPropertyRules;
}

/**
 * Generates a list of parsed properties from a given model
 * @param options object containing the model
 * @returns generated properties array
 */
export const propertiesGenerator = ({
  model,
}: IPropertiesGeneratorOptions): Array<IParsedPropertyWithRules> => {
  return model.values.map((entry) => {
    const property: IParsedPropertyWithRules = {
      predicate: entry.predicate,
      properties: [entry.value],
      firstProperty: entry.value,
      rules: entry.rules || { required: false },
    };

    return property;
  });
};
