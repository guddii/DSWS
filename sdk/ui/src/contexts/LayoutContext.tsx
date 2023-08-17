"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Grid } from "antd";
const { useBreakpoint } = Grid;
export interface ILayoutContext {
  collapsedSider?: boolean;
  setCollapsedSider: Dispatch<SetStateAction<boolean>>;
  lockedSider?: boolean;
  setLockedSider: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<ILayoutContext | undefined>(undefined);

interface ILayoutProviderProperties {
  children: ReactNode;
}
export function LayoutProvider({ children }: ILayoutProviderProperties) {
  // The store data
  const [collapsedSider, setCollapsedSider] = useState<boolean>(true);
  const [lockedSider, setLockedSider] = useState<boolean>(false);

  const screens = useBreakpoint();

  useEffect(() => {
    setCollapsedSider(!screens.md);
    setLockedSider(!!screens.md);
  }, [screens]);

  /**
   * The shared state available to child nodes
   */
  const value: ILayoutContext = {
    collapsedSider,
    setCollapsedSider,
    lockedSider,
    setLockedSider,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

/**
 * Returns the Layout context
 */
export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
