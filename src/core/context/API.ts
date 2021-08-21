export interface History {
  previous?: History;
  open: number;
}

export interface TabItem<T> {
  id: string;
  label: React.ReactElement | string;
  data?: T;
  edit?: boolean;
}
export interface Tabs {
  values: readonly TabItem<any>[];
  active: TabItem<any> | undefined;
  dimensions: { width: number, height: number },

  findTab(newTabId: string): number | undefined;
  getTabData(tabId: string): any;
}

export interface DrawerItem<T> {
  id: string;
  label?: React.ReactElement | string;
  data?: T;
}
export interface Drawer {
  open: boolean;
  dimensions: { width: number },
  active: DrawerItem<any> | undefined;
  values: readonly DrawerItem<any>[];
  findTab(newTabId: string): number | undefined;
  getTabData(tabId: string): any;
}

export interface Instance {
  history: History;
  search?: string;
  tabs: Tabs;
  drawer: Drawer;

  withDrawer(props: { open: boolean }): Instance;
  withDrawerItem(props: { activeITem: string }): Instance;

  withSearch(keyword: string): Instance;
  withTabData(tabId: string, updateCommand: (oldData: any) => any): Instance;
  withTabDataDimensions(props: { width: number, height: number }): Instance;

  withTab(newTabOrTabIndex: TabItem<any> | number): Instance;

  withoutTabs(): Instance;
  withoutTab(deleteTabId: string): Instance;
}

export interface Actions {
  handleDrawer(open?: boolean): void;
  handleTabDataDimensions(props: { width: number, height: number }): void;
  handleDialog(id?: string): void;
  handleLink(id?: string): void;
  handleSearch(keyword: string): void;
  handleTabAdd(newItem: TabItem<any>): void;
  handleTabChange(tabIndex: number): void;
  handleTabClose(tab: TabItem<any>): void;
  handleTabCloseAll(): void;
}

export interface ContextType {
  session: Instance;
  actions: Actions;
}