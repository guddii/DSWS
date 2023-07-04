import { UrlString } from "@inrupt/solid-client";

interface ITurtleFileGeneratorOptions {
  subject: UrlString | URL;
  values: Record<UrlString, string>;
}

/**
 * Generates a turtle file content string containing triples of the given subject and all predicate/value pairs.
 * @param options object containing the subject and values array of predicate/value pairs
 * @returns generated turtle file content
 */
export const turtleFileGenerator = (
  options: ITurtleFileGeneratorOptions | void
): string => {
  if (!options) {
    return "";
  }

  const { subject, values } = options;

  return Object.entries(values)
    .map(([predicate, value]) => `<${subject}> <${predicate}> "${value}".`)
    .join("\n");
};
