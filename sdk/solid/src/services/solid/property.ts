import { Thing, UrlString } from "@inrupt/solid-client";
import { createUrl } from "../../helper/urlHelper";

export interface IGetPropertyOptions {
  thing?: Thing;
  predicate?: URL;
}

export interface IGetPropertiesOptions {
  thing?: Thing;
}

export interface IParsedProperty {
  predicate: URL;
  properties: Array<string>;
  firstProperty: string;
}

const getPredicateValue = (options: Required<IGetPropertyOptions>) => {
  const predicate = options.predicate.toString();
  let predicateValue: Record<UrlString, any> = {};
  if (options.thing.predicates.hasOwnProperty(predicate)) {
    predicateValue = options.thing.predicates[predicate];
  } else {
    console.error(new Error(`${predicate} does not exist in thing`));
  }
  return predicateValue;
};

const literal = {
  string: createUrl("http://www.w3.org/2001/XMLSchema#string"),
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

export const getProperty = (options: IGetPropertyOptions): IParsedProperty => {
  if (!options.thing) {
    throw new Error("thing missing");
  }
  if (!options.predicate) {
    throw new Error("predicate missing");
  }

  const parsedPropertyObject: IParsedProperty = {
    predicate: options.predicate,
    properties: [],
    firstProperty: "",
  };

  const predicateValue: Record<UrlString, any> = getPredicateValue({
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

export const getProperties = (
  options: IGetPropertiesOptions
): Array<IParsedProperty> => {
  if (!options.thing) {
    throw new Error("thing missing");
  }

  return Object.keys(options.thing.predicates).map((predicate) =>
    getProperty({ thing: options.thing, predicate: createUrl(predicate) })
  );
};
