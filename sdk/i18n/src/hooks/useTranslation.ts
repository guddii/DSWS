import { useLocaleFromPath } from "./useLocaleFromPath";
import { useDictionary } from "./useDictionary";
import type { I18nKey } from "../i18nConfig";
import { generateText } from "../helper/generateText";

export const useTranslation = () => {
  const currentLocale = useLocaleFromPath();
  const { dictionary } = useDictionary(currentLocale);

  return (key: I18nKey, ...replacements: Array<string>) => {
    let text = dictionary[key];
    if (text) {
      return generateText(text, ...replacements);
    }
    return `[${key}]`;
  };
};
