import { Locale } from "../i18nConfig";
import { dictionaries } from "../dictionaries";

export const getDictionary = async (locale: Locale) => {
  return (await dictionaries[locale]?.()) ?? (await dictionaries.en());
};
