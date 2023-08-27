"use client";
import { toUrlString } from "solid";
import { Button, App } from "antd";
import { createUrl } from "solid";
import { useIdentity } from "../../contexts/IdentityContext";
import { Dataset, useLoadDataset, usePage } from "../../contexts/PageContext";
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
  const { storage } = useIdentity();
  const { setDataset } = usePage();
  const [isLoading, setIsLoading] = useState(false);
  const datasetUrl = toUrlString(createUrl(datasetPath, storage));
  const loadDataset = useLoadDataset();

  const loadDatasetWithLoadingState = useCallback(async (): Promise<
    Dataset | undefined
  > => {
    setIsLoading(true);
    const dataset = await loadDataset(datasetUrl);
    setIsLoading(false);
    return dataset;
  }, [datasetUrl, loadDataset]);

  const loadAndSetDatasetWithLoadingState = useCallback(async () => {
    const dataset = await loadDatasetWithLoadingState();
    setDataset(dataset);
  }, [loadDatasetWithLoadingState, setDataset]);

  useEffect(() => {
    if (enableInitialLoading && enableSwrLoading) {
      console.warn(
        "Cannot enable swr loading and initial loading at the same time. Initial loading is automatically disabled when swr loading is enabled."
      );
    }

    if (enableInitialLoading && !enableSwrLoading) {
      loadAndSetDatasetWithLoadingState();
    }
  }, [
    enableInitialLoading,
    enableSwrLoading,
    loadAndSetDatasetWithLoadingState,
  ]);

  if (!storage) {
    console.error("storage missing");
    return null;
  }

  return (
    <>
      <Button onClick={loadAndSetDatasetWithLoadingState} loading={isLoading}>
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
