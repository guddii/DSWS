import { i18n, Locale } from "../i18nConfig";

const PATH_DELIMITER = "/";

export const getLocaleFromPath = (pathName: string): Locale => {
  const segments = pathName.split(PATH_DELIMITER);
  const findLocal = (value: Locale) => value === segments[1];
  return i18n.locales.find(findLocal) ?? i18n.defaultLocale;
};
