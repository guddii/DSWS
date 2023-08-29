import { useLocaleFromPath } from "./useLocaleFromPath";
import { useDictionary } from "./useDictionary";

export const useTranslation = () => {
  const currentLocale = useLocaleFromPath();
  const { dictionary } = useDictionary(currentLocale);

  return (key: string) => {
    return dictionary[key] ?? `[${key}]`;
  };
};
