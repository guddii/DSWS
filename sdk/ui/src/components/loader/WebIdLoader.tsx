import { ReactNode, useMemo } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import useSWRImmutable from "swr/immutable";
import {
  LoadingFailed,
  LoadingFailedFullbleed,
  LoadingFullbleed,
} from "../Loading";
import { hasNoDataOrError } from "../../helper/hasNoDataOrError";
import { StorageLoader } from "./StorageLoader";
import { createUrl, getThing, removeHashFromUrl } from "solid";
import { useIdentity } from "../../contexts/IdentityContext";

interface IWebIdLoaderProperties {
  children: ReactNode;
}
export const WebIdLoader = ({ children }: IWebIdLoaderProperties) => {
  const { session } = useSession();
  const { webId } = useIdentity();

  const options = useMemo(() => {
    const datasetUrl = webId ? removeHashFromUrl(webId) : undefined;
    const thingUrl = webId ? createUrl(webId) : undefined;

    return { datasetUrl, thingUrl, session };
  }, [session]);

  const { data, error, isLoading } = useSWRImmutable(options, getThing);

  if (isLoading) return <LoadingFullbleed />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }

  return <StorageLoader thing={data}>{children}</StorageLoader>;
};
