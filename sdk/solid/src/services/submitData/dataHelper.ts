import {
  UrlString,
  getSolidDataset,
  createSolidDataset,
  saveSolidDatasetInContainer,
  getUrl,
  getStringNoLocale,
  getBoolean,
  getSourceUrl,
  getThing,
  createThing,
  addUrl,
  addStringNoLocale,
  addBoolean,
  setThing,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-node";
import {
  toUrlString,
  createUrl,
  replaceHashInUrl,
} from "../../helper/urlHelper";

export const createNewPod = async (session: Session) => {
  const response = await session.fetch("https://provision.inrupt.com/", {
    method: "POST",
  });
  const body = await response.json();

  if (!body.storage) {
    throw new Error("Pod creation failed.");
  }

  return String(body.storage);
};

export const submitDataGetDataset = async (
  session: Session,
  storage: string,
  name: string
) => {
  try {
    const url: UrlString = toUrlString(createUrl(name, storage));
    const dataset = await getSolidDataset(url.toString(), {
      fetch: session.fetch,
    });

    return dataset;
  } catch (error: any) {
    if (error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const submitDataCreateDataset = async (
  session: Session,
  storage: string,
  name: string
) => {
  const dataset = createSolidDataset();

  await saveSolidDatasetInContainer(storage, dataset, {
    fetch: session.fetch,
    slugSuggestion: name,
  });
};

type TypeName = "url" | "string" | "boolean";

type ReturnTypes<T> = T extends "url"
  ? ReturnType<typeof getUrl>
  : T extends "string"
  ? ReturnType<typeof getStringNoLocale>
  : T extends "boolean"
  ? ReturnType<typeof getBoolean>
  : never;

export const getValueFromDataset = async <T extends TypeName>(
  session: Session,
  storage: string,
  name: string,
  subject: string,
  predicate: string,
  type: T
): Promise<ReturnTypes<T> | null> => {
  const dataset = await submitDataGetDataset(session, storage, name);
  if (!dataset) {
    throw new Error("Dataset missing.");
  }

  const thingUrl: UrlString = toUrlString(
    replaceHashInUrl(getSourceUrl(dataset), `#${subject}`)
  );
  const thing = getThing(dataset, thingUrl);
  if (!thing) {
    return null;
  }

  switch (type) {
    case "url":
      return getUrl(thing, predicate) as ReturnTypes<T>;
    case "string":
      return getStringNoLocale(thing, predicate) as ReturnTypes<T>;
    case "boolean":
      return getBoolean(thing, predicate) as ReturnTypes<T>;
    default:
      return null;
  }
};

type ValueTypes<T> = T extends "url"
  ? UrlString
  : T extends "string"
  ? string
  : T extends "boolean"
  ? boolean
  : never;

export const addValueToDataset = async <T extends TypeName>(
  session: Session,
  storage: string,
  name: string,
  subject: string,
  predicate: string,
  value: ValueTypes<T>,
  type: T
) => {
  let dataset = await submitDataGetDataset(session, storage, name);
  if (!dataset) {
    throw new Error("Dataset missing.");
  }

  let thing = createThing({ name: subject });

  switch (type) {
    case "url":
      thing = addUrl(thing, predicate, value as ValueTypes<"url">);
      break;
    case "string":
      thing = addStringNoLocale(
        thing,
        predicate,
        value as ValueTypes<"string">
      );
      break;
    case "boolean":
      thing = addBoolean(thing, predicate, value as ValueTypes<"boolean">);
      break;
    default:
      break;
  }

  dataset = setThing(dataset, thing);

  return await saveSolidDatasetAt(getSourceUrl(dataset), dataset, {
    fetch: session.fetch,
  });
};
