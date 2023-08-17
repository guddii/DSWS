"use client";
import { getSolidDataset, toUrlString } from "solid";
import { Button, App } from "antd";
import { createUrl } from "solid";
import { useIdentity } from "../../contexts/IdentityContext";
import { Dataset, usePage } from "../../contexts/PageContext";
import { useSession } from "@inrupt/solid-ui-react";
import { useCallback, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

interface IDatasetSwrLoader {
  swrKey: string;
  fetcher: Fetcher<Dataset | undefined>;
  onSuccess: (data: Dataset | undefined) => void;
}

const DatasetSwrLoader = ({
  swrKey,
  fetcher,
  onSuccess,
}: IDatasetSwrLoader) => {
  const { message } = App.useApp();
  const { error } = useSWR(swrKey, fetcher, {
    onSuccess,
  });

  if (error) {
    console.error(error);
    message.error(error.message || "Error while fetching dataset");
  }

  return null;
};

interface IControlsDatasetProperties {
  datasetPath: string;
  enableInitialLoading?: boolean;
  enableSwrLoading?: boolean;
  buttonLabel?: string;
}

export const ControlsDataset = ({
  datasetPath,
  enableInitialLoading = false,
  enableSwrLoading = false,
  buttonLabel = "Load Dataset",
}: IControlsDatasetProperties) => {
  const { message } = App.useApp();
  const { session } = useSession();
  const { storage } = useIdentity();
  const { setDataset } = usePage();
  const [isLoading, setIsLoading] = useState(false);
  const datasetUrl = toUrlString(createUrl(datasetPath, storage));

  const loadDataset = useCallback(async (): Promise<Dataset | undefined> => {
    setIsLoading(true);

    try {
      const dataset = await getSolidDataset(datasetUrl, {
        fetch: session.fetch,
      });

      setIsLoading(false);
      return dataset;
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while fetching dataset");

      setIsLoading(false);
      return;
    }
  }, [datasetUrl, message, session.fetch]);

  const loadAndSetDataset = useCallback(async () => {
    const dataset = await loadDataset();
    setDataset(dataset);
  }, [loadDataset, setDataset]);

  useEffect(() => {
    if (enableInitialLoading && enableSwrLoading) {
      console.warn(
        "Cannot enable swr loading and initial loading at the same time. Initial loading is automatically disabled when swr loading is enabled."
      );
    }

    if (enableInitialLoading && !enableSwrLoading) {
      loadAndSetDataset();
    }
  }, [enableInitialLoading, enableSwrLoading, loadAndSetDataset]);

  if (!storage) {
    console.error("storage missing");
    return null;
  }

  return (
    <>
      <Button onClick={loadAndSetDataset} loading={isLoading}>
        {buttonLabel}
      </Button>
      {enableSwrLoading && (
        <DatasetSwrLoader
          swrKey={datasetUrl}
          fetcher={loadDataset}
          onSuccess={setDataset}
        />
      )}
    </>
  );
};
