import { IMetadataOptions, INavigation } from "ui";
import { getTranslation } from "i18n/server";

export const generateNavigation = async ({
  params,
}: IMetadataOptions): Promise<INavigation> => {
  const t = await getTranslation(params.locale);
  return {
    contextNavigation: [
      {
        key: `/${params.locale}/forms`,
        label: t("_.form"),
      },
    ],
  };
};
