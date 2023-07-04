import { ReactNode, useMemo } from "react";
import { getThing } from "solid";
import { useSession } from "@inrupt/solid-ui-react";
import { assignPropsToChildren } from "../helper/assignPropsToChildren";
import { Loading, LoadingFailed } from "./Loading";
import useSWR from "swr";
import { hasNoDataOrError } from "../helper/hasNoDataOrError";
import { replaceHashInUrl, createUrl } from "solid";

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
  const { session } = useSession();
  const options = useMemo(() => {
    const datasetUrl = createUrl(dataset);
    const thingUrl = replaceHashInUrl(datasetUrl, subject);

    return { datasetUrl, thingUrl, session };
  }, [dataset, session, subject]);

  const { data, error, isLoading } = useSWR(options, getThing);

  if (isLoading) return <Loading />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailed />;
  }

  const childrenWithProps = assignPropsToChildren(children, {
    thing: data,
    thingUrl: options.thingUrl,
  });
  return <>{childrenWithProps}</>;
};
