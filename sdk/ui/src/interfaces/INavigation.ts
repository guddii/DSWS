export interface INavigationEntry {
  key: string;
  label: string;
}

export interface INavigation {
  routes: Array<INavigationEntry>;
}
