import { AbstractModel, IParsedProperty } from "solid";

interface IPropertiesGeneratorOptions {
  model: AbstractModel;
}

export interface IParsedPropertyRules {
  required: boolean;
}

export interface IParsedPropertyOptions {
  reference?: boolean;
}

export interface IParsedPropertyWithRulesAndOptions extends IParsedProperty {
  rules?: IParsedPropertyRules;
  options?: IParsedPropertyOptions;
}

/**
 * Generates a list of parsed properties from a given model
 * @param options object containing the model
 * @returns generated properties array
 */
export const propertiesGenerator = ({
  model,
}: IPropertiesGeneratorOptions): Array<IParsedPropertyWithRulesAndOptions> => {
  return model.values.map((entry) => {
    const property: IParsedPropertyWithRulesAndOptions = {
      predicate: entry.predicate,
      properties: [entry.value],
      firstProperty: entry.value,
      rules: entry.rules || { required: false },
      options: entry.options,
    };

    return property;
  });
};
