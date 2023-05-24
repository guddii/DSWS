import { Thing } from "./useThing";
import { IriString } from "@inrupt/solid-client";
import { logger } from "../services/logger";

interface IUsePropertyOptions {
  thing?: Thing;
  predicate?: URL;
}

const getPredicateValue = (options: Required<IUsePropertyOptions>) => {
  const predicate = options.predicate.toString();
  let predicateValue: Record<IriString, any> = {};
  if (options.thing.predicates.hasOwnProperty(predicate)) {
    predicateValue = options.thing.predicates[predicate];
  } else {
    logger({ error: new Error(`${predicate} does not exist in thing`) });
  }
  return predicateValue;
};

const literal = {
  string: new URL("http://www.w3.org/2001/XMLSchema#string"),
};

const getLiteralsValue = (predicateValue: any) => {
  let literalsValue: Record<any, any> = {};
  let literalValue = [];

  if (predicateValue.hasOwnProperty("literals")) {
    literalsValue = predicateValue["literals"];

    if (literalsValue.hasOwnProperty(literal.string.toString())) {
      literalValue = literalsValue[literal.string.toString()];
    }
  }
  return literalValue;
};

const getNamedNode = (predicateValue: any) => {
  return predicateValue.namedNodes ?? [];
};

export const useProperty = (options: IUsePropertyOptions) => {
  const parsedPropertyObject = {
    properties: [],
    firstProperty: "",
    error: false,
  };

  if (!options.thing || !options.predicate) {
    parsedPropertyObject.error = true;
    return parsedPropertyObject;
  }

  const predicateValue: Record<IriString, any> = getPredicateValue({
    thing: options.thing,
    predicate: options.predicate,
  });

  parsedPropertyObject.properties = getLiteralsValue(predicateValue);

  if (!parsedPropertyObject.properties.length) {
    parsedPropertyObject.properties = getNamedNode(predicateValue);
  }

  parsedPropertyObject.firstProperty = parsedPropertyObject.properties.length
    ? parsedPropertyObject.properties[0]
    : "";

  return parsedPropertyObject;
};
