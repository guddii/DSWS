"use client";
import { useSession } from "@inrupt/solid-ui-react";
import { App } from "antd";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  getSolidDataset,
  SolidDataset,
  UrlString,
  WithServerResourceInfo,
} from "solid";

export type Dataset = SolidDataset & WithServerResourceInfo;

export interface IPageContext {
  dataset?: Dataset;
  setDataset: Dispatch<SetStateAction<Dataset | undefined>>;
}

const PageContext = createContext<IPageContext | undefined>(undefined);

interface IPageProviderProperties {
  children: ReactNode;
}
export function PageProvider({ children }: IPageProviderProperties) {
  // The store data
  const [dataset, setDataset] = useState<Dataset>();

  /**
   * The shared state available to child nodes
   */
  const value: IPageContext = {
    dataset,
    setDataset,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

/**
 * Returns the Page context
 */
export function usePage() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
}

export function useLoadDataset() {
  const { message } = App.useApp();
  const { session } = useSession();

  return useCallback(
    async (datasetUrl: UrlString): Promise<Dataset | undefined> => {
      try {
        return await getSolidDataset(datasetUrl, {
          fetch: session.fetch,
        });
      } catch (error: any) {
        console.error(error);
        message.error(error.message || "Error while fetching dataset");

        return;
      }
    },
    [message, session.fetch]
  );
}

export function useLoadAndSetDataset() {
  const { setDataset } = usePage();
  const loadDataset = useLoadDataset();

  return useCallback(
    async (datasetUrl: UrlString): Promise<void> => {
      const dataset = await loadDataset(datasetUrl);
      setDataset(dataset);
    },
    [loadDataset, setDataset]
  );
}
