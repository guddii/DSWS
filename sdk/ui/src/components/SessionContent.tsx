import { Thing, useSession, useThing, WS, useProperty } from "solid";
import React, { ReactNode } from "react";
import { Empty } from "antd";
import { Loading, LoadingFailed } from "./Loading";
import { assignPropsToChildren } from "../helper/assignPropsToChildren";

interface IStorageLoaderProperties {
  thing: Thing;
  children: ReactNode;
}
const StorageLoader = ({ thing, children }: IStorageLoaderProperties) => {
  const { getProperty } = useProperty();

  const predicate = new URL(WS.storage);
  const { firstProperty } = getProperty({ thing, predicate });

  const childrenWithProps = assignPropsToChildren(children, {
    storage: firstProperty,
  });
  return <>{childrenWithProps}</>;
};

interface IWebIdLoaderProperties {
  webId: string;
  children: ReactNode;
}
const WebIdLoader = ({ webId, children }: IWebIdLoaderProperties) => {
  const thingUrl = new URL(webId);
  const datasetUrl: URL = new URL(webId);
  datasetUrl.hash = "";

  const { thing, error } = useThing({ datasetUrl, thingUrl });
  if (error) return <LoadingFailed />;
  if (!thing) return <Loading />;

  return <StorageLoader thing={thing}>{children}</StorageLoader>;
};

interface ILoggedInContentProperties {
  children: ReactNode;
}
export const SessionContent = ({ children }: ILoggedInContentProperties) => {
  const { session } = useSession();
  const { webId } = session.info;

  if (!session.info.isLoggedIn || !webId) {
    return (
      <Empty
        description={"This is private content, please login first!"}
        style={{ marginTop: 50 }}
      />
    );
  }

  return <WebIdLoader webId={webId}>{children}</WebIdLoader>;
};
