import { Parser, Prefixes, Quad, Store } from "n3";

interface IParseToN3Options {
  url: URL;
  text: string;
}

export interface ParsedN3 {
  store: Store;
  prefixes: Prefixes;
}

export const parseToN3 = async (
  options: IParseToN3Options
): Promise<ParsedN3> => {
  const baseIri = new URL(options.url);
  baseIri.hash = "";

  const n3Store = new Store();
  const n3parser = new Parser({
    baseIRI: baseIri.toString(),
    blankNodePrefix: "",
  });

  return new Promise((resolve, reject) => {
    n3parser.parse(
      options.text,
      (error: Error, quad: Quad, prefixes: Prefixes) => {
        if (error) {
          reject(error);
        }

        if (quad) {
          n3Store.addQuad(quad);
        } else {
          resolve({ store: n3Store, prefixes });
        }
      }
    );
  });
};
