import { Thing, WS, getProperty } from "solid";
import { ReactNode, useMemo } from "react";
import { LoadingFailedFullbleed, LoadingFullbleed } from "../Loading";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { createUrl } from "solid";
import { hasNoDataOrError } from "../../helper/hasNoDataOrError";
import useSWR from "swr";

interface IStorageLoaderProperties {
  thing: Thing;
  children: ReactNode;
}

export const StorageLoader = ({
  thing,
  children,
}: IStorageLoaderProperties) => {
  const options = useMemo(
    () => ({ thing, predicate: createUrl(WS.storage) }),
    [thing]
  );

  const { data, error, isLoading } = useSWR(options, getProperty);

  if (isLoading) return <LoadingFullbleed />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }

  const childrenWithProps = assignPropsToChildren(children, {
    storage: data.firstProperty,
  });
  return <>{childrenWithProps}</>;
};
