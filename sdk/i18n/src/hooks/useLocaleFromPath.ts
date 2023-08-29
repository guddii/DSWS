import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "../helper/getLocaleFromPath";

export const useLocaleFromPath = () => {
  const pathName = usePathname();
  return getLocaleFromPath(pathName);
};
