import { ReactNode } from "react";
import { useThing } from "solid";
import { assignPropsToChildren } from "../helper/assignPropsToChildren";
import { Loading, LoadingFailed } from "./Loading";

interface IResourceLoaderProperties {
  dataset: string;
  subject: string;
  children: ReactNode;
}

export const ResourceLoader = ({
  dataset,
  subject,
  children,
}: IResourceLoaderProperties) => {
  const datasetUrl: URL = new URL(dataset);
  const thingUrl: URL = new URL(`${datasetUrl.toString()}${subject}`);

  const { thing, error } = useThing({ datasetUrl, thingUrl });
  if (error) return <LoadingFailed />;
  if (!thing) return <Loading />;

  const childrenWithProps = assignPropsToChildren(children, {
    thing,
    thingUrl,
  });
  return <>{childrenWithProps}</>;
};
