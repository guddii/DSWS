import { NextRequest } from "next/server";
import { i18n } from "../i18nConfig";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

export const getLocaleFromRequest = (
  request: NextRequest
): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, i18n.defaultLocale);
};
