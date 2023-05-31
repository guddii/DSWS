interface ITurtleFileGeneratorOptions {
  subject: string;
  values: Record<string, string>;
}

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
