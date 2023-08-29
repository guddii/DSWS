import { Locale } from "../i18nConfig";
import { getDictionary } from "./getDictionary";

export const getTranslation = async (currentLocale: Locale) => {
  const dictionary: Record<string, string> = await getDictionary(currentLocale);

  return (key: string) => {
    return dictionary[key] ?? `[${key}]`;
  };
};
