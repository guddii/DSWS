import type { I18nKey, Locale } from "../i18nConfig";
import { getDictionary } from "./getDictionary";
import { generateText } from "../helper/generateText";

export const getTranslation = async (currentLocale: Locale) => {
  const dictionary: Record<string, string | undefined> = await getDictionary(
    currentLocale
  );

  return (key: I18nKey, ...replacements: Array<string>) => {
    let text = dictionary[key];
    if (text) {
      return generateText(text, ...replacements);
    }
    return `[${key}]`;
  };
};
