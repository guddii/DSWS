import { Locale } from "../i18nConfig";
import { useCallback, useEffect, useState } from "react";
import { getDictionary } from "../services/getDictionary";

export const useDictionary = (locale: Locale) => {
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const callback = useCallback(async () => {
    return getDictionary(locale);
  }, [locale]);

  useEffect(() => {
    callback()
      .then(setDictionary)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [callback]);

  return { dictionary, error, isLoading };
};
