export const generateText = (text: string, ...replacements: Array<string>) => {
  replacements.forEach((replacement, index) => {
    text = text.replace(`<${index + 1}>`, replacement);
  });
  return text;
};
