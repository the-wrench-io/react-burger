
interface SessionContextType {
  session: Session;
  actions: SessionActions;
}

interface Session {
  appId: string;
  history: SessionHistory;
  secondary?: string;
  tabs: readonly SessionTab<any>[];
  drawer: boolean;

  findTab(newTabId: string): number | undefined;
  getTabData(tabId: string): any;

  withDrawer(open: boolean): Session;
  withTabData(tabId: string, updateCommand: (oldData: any) => any): Session;
  withTab(newTabOrTabIndex: SessionTab<any> | number): Session;
  withSecondary(newItemId?: string): Session;

  deleteTabs(): Session;
  deleteTab(tabId: string): Session;
}

interface SessionTab<T> {
  id: string;
  label: string | React.ReactElement;
  icon?: string | React.ReactElement;
  data?: T;
  edit?: boolean;
}

interface SessionHistory {
  previous?: SessionHistory;
  open: number;
}


interface SessionActions {
  handleDrawerOpen(open: boolean): void;
  handleTabAdd(newItem: SessionTab<any>): void;
  handleSecondary(newItemId?: string): void;
  handleTabData(tabId: string, updateCommand: (oldData: any) => any): void;
  handleTabChange(tabIndex: number): void;
  handleTabClose(tab: SessionTab<any>): void;
  handleTabCloseCurrent(): void;
  handleTabCloseAll(): void;
}

export type { SessionContextType, Session, SessionTab, SessionHistory, SessionActions };