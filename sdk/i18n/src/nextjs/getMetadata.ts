import { Metadata } from "next";
import { getTranslation } from "../services/getTranslation";
import { Locale } from "../i18nConfig";

export async function getMetadata({
  params,
  key,
}: {
  params: { locale: Locale };
  key: string;
}): Promise<Metadata> {
  const t = await getTranslation(params.locale);

  return {
    title: t(key),
  };
}
