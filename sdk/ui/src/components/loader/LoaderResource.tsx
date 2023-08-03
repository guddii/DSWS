import { ReactNode, useMemo } from "react";
import { legacyGetThing } from "solid";
import { useSession } from "@inrupt/solid-ui-react";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { LoadingFailedFullbleed, LoadingFullbleed } from "../Loading";
import useSWR from "swr";
import { hasNoDataOrError } from "../../helper/hasNoDataOrError";
import { replaceHashInUrl, createUrl } from "solid";

interface ILoaderResourceProperties {
  dataset: string;
  subject: string;
  children: ReactNode;
}

export const LoaderResource = ({
  dataset,
  subject,
  children,
}: ILoaderResourceProperties) => {
  const { session } = useSession();
  const options = useMemo(() => {
    const datasetUrl = createUrl(dataset);
    const thingUrl = replaceHashInUrl(datasetUrl, subject);

    return { datasetUrl, thingUrl, session };
  }, [dataset, session, subject]);

  const { data, error, isLoading } = useSWR(options, legacyGetThing);

  if (isLoading) return <LoadingFullbleed />;
  if (hasNoDataOrError(data, error)) {
    console.error(error);
    return <LoadingFailedFullbleed />;
  }

  const childrenWithProps = assignPropsToChildren(children, {
    thing: data,
    thingUrl: options.thingUrl,
  });
  return <>{childrenWithProps}</>;
};
