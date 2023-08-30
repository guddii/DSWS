import { IMetadataOptions, INavigation } from "ui";
import { getTranslation } from "i18n/server";

export const generateNavigation = async ({
  params,
}: IMetadataOptions): Promise<INavigation> => {
  const t = await getTranslation(params.locale);
  return {
    contextActions: [
      {
        key: `/${params.locale}/inbox`,
        label: t("_.inbox"),
      },
    ],
    contextNavigation: [
      {
        key: `/${params.locale}/forms`,
        label: t("_.forms"),
      },
    ],
  };
};
