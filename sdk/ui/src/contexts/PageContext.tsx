"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SolidDataset, WithServerResourceInfo } from "solid";

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
