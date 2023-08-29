import { i18n } from "../i18nConfig";

export function getStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
