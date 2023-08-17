export interface INavigationEntry {
  key: string;
  label: string;
}

export interface INavigation {
  mainNavigation?: {
    hasInbox: boolean;
  };
  contextActions?: Array<INavigationEntry>;
  contextNavigation?: Array<INavigationEntry>;
}
