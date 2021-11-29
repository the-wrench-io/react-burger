import * as API from './SessionAPI';

enum ReducerActionType {
  addTab = "addTab",
  setDrawer = "setDrawer",
  removeTab = "removeTab",
  changeTab = "changeTab",
  closeTabs = "closeTabs",
  closeTabCurrent = "closeTabCurrent",
  setTabData = "setTabData",
  setSecondary = "setSecondary"
}

interface ReducerAction {
  type: ReducerActionType;
  addTab?: API.SessionTab<any>;
  setDrawer?: boolean;
  removeTab?: string;
  changeTab?: number;
  setSecondary?: string;
  setTabData?: { id: string, updateCommand: (oldData: any) => any };
}

class SessionReducerDispatch implements API.SessionActions {

  private _sessionDispatch: React.Dispatch<ReducerAction>;
  constructor(session: React.Dispatch<ReducerAction>) {
    console.log("init burger dispatch");
    this._sessionDispatch = session;
  }
  handleSecondary(newItemId?: string) {
    this._sessionDispatch({ type: ReducerActionType.setSecondary, setSecondary: newItemId });
  }
  handleDrawerOpen(drawerOpen: boolean) {
    this._sessionDispatch({ type: ReducerActionType.setDrawer, setDrawer: drawerOpen });
  }
  handleTabAdd(newItem: API.SessionTab<any>) {
    this._sessionDispatch({ type: ReducerActionType.addTab, addTab: newItem });
  }
  handleTabChange(tabIndex: number) {
    this._sessionDispatch({ type: ReducerActionType.changeTab, changeTab: tabIndex })
  }
  handleTabClose(tab: API.SessionTab<any>) {
    this._sessionDispatch({ type: ReducerActionType.removeTab, removeTab: tab.id });
  }
  handleTabCloseAll() {
    this._sessionDispatch({ type: ReducerActionType.closeTabs });
  }
  handleTabData(tabId: string, updateCommand: (oldData: any) => any) {
    this._sessionDispatch({
      type: ReducerActionType.setTabData,
      setTabData: { id: tabId, updateCommand }
    });
  }
  handleTabCloseCurrent() {
    this._sessionDispatch({ type: ReducerActionType.closeTabCurrent });
  }
}

const SessionReducer = (state: API.Session, action: ReducerAction): API.Session => {
  switch (action.type) {
    case ReducerActionType.addTab: {
      if (action.addTab) {
        return state.withTab(action.addTab);
      }
      console.error("Action data error", action);
      return state;
    }
    case ReducerActionType.changeTab: {
      if (action.changeTab === undefined) {
        console.error("Action data error", action);
        return state;
      }
      return state.withTab(action.changeTab);
    }
    case ReducerActionType.removeTab: {
      if (!action.removeTab) {
        console.error("Action data error", action);
        return state;
      }
      return state.deleteTab(action.removeTab);
    }
    case ReducerActionType.setSecondary: {
      if (!action.setSecondary) {
        console.error("Action data error", action);
        return state;
      }
      const result = state.withSecondary(action.setSecondary);
      if (result.drawer === false) {
        return result.withDrawer(true);
      }
      return result;
    }
    case ReducerActionType.setDrawer: {
      if (action.setDrawer === undefined) {
        console.error("Action data error", action);
        return state;
      }
      return state.withDrawer(action.setDrawer);
    }
    case ReducerActionType.setTabData: {
      if (!action.setTabData) {
        console.error("Action data error", action);
        return state;
      }
      return state.withTabData(action.setTabData.id, action.setTabData.updateCommand);
    }
    case ReducerActionType.closeTabs: {
      return state.deleteTabs();
    }
    case ReducerActionType.closeTabCurrent: {
      const active = state.history.open;
      const tab = state.tabs[active];
      return state.deleteTab(tab.id);
    }
  }
}

export { SessionReducer, SessionReducerDispatch };
