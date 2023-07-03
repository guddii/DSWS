import { Thing, useSession, WS, getProperty, getThing } from "solid";
import { ReactNode, useMemo } from "react";
import { Empty } from "antd";
import { Loading, LoadingFailed } from "./Loading";
import { assignPropsToChildren } from "../helper/assignPropsToChildren";
import { removeHashFromUrl, createUrl } from "solid";
import { hasNoDataOrError } from "../helper/hasNoDataOrError";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

interface IStorageLoaderProperties {
  thing: Thing;
  children: ReactNode;
}

const StorageLoader = ({ thing, children }: IStorageLoaderProperties) => {
  const options = useMemo(
    () => ({ thing, predicate: createUrl(WS.storage) }),
    [thing]
  );

  const { data, error, isLoading } = useSWR(options, getProperty);

  if (isLoading) return <Loading />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailed />;
  }

  const childrenWithProps = assignPropsToChildren(children, {
    storage: data.firstProperty,
  });
  return <>{childrenWithProps}</>;
};

interface IWebIdLoaderProperties {
  children: ReactNode;
}
const WebIdLoader = ({ children }: IWebIdLoaderProperties) => {
  const { session } = useSession();

  const options = useMemo(() => {
    const { webId } = session.info;
    const datasetUrl = webId ? removeHashFromUrl(webId) : undefined;
    const thingUrl = webId ? createUrl(webId) : undefined;

    return { datasetUrl, thingUrl, session };
  }, [session]);

  const { data, error, isLoading } = useSWRImmutable(options, getThing);

  if (isLoading) return <Loading />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailed />;
  }

  return <StorageLoader thing={data}>{children}</StorageLoader>;
};

interface ILoggedInContentProperties {
  children: ReactNode;
  alwaysShowChildren?: boolean;
}

export const SessionContent = ({
  children,
  alwaysShowChildren = false,
}: ILoggedInContentProperties) => {
  const { session } = useSession();
  const { webId } = session.info;

  if (!session.info.isLoggedIn || !webId) {
    if (alwaysShowChildren) {
      return <>{children}</>;
    } else {
      return (
        <Empty
          description={"This is private content, please login first!"}
          style={{ marginTop: 50 }}
        />
      );
    }
  }

  return <WebIdLoader>{children}</WebIdLoader>;
};
