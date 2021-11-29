import { AppProviderProps, useApps as useAppsAlias, AppProvider } from './context/AppContext';
import { useDrawer as useDrawerAlias } from './context/drawer/DrawerContext';
import { useTabs as useTabsAlias } from './context/tabs/TabsContext';
import { useSecondary as useSecondaryAlias } from './context/secondary/SecondaryContext';



import {
  AppContextType, AppSession, AppActions, 
  App, AppId, AppState, AppStateCreate, AppStateRestore
} from './context/AppAPI';
import {
  DrawerContextType, DrawerSession, DrawerActions
} from './context/drawer/DrawerAPI';
import {
  TabsContextType, TabsSession, TabSession, TabsHistory, TabsActions
} from './context/tabs/TabsAPI';
import {
  SecondaryContextType, SecondarySession, SecondaryActions 
} from './context/secondary/SecondaryAPI';


declare namespace Burger {
  export { 
    AppProviderProps, AppContextType, AppSession, AppActions,  App, AppId, AppState, AppStateCreate, AppStateRestore,
    DrawerContextType, DrawerSession, DrawerActions,
    TabsContextType, TabsSession, TabSession, TabsHistory, TabsActions,
    SecondaryContextType, SecondarySession, SecondaryActions
  };
}

namespace Burger {
  export const Provider = AppProvider;
  export const useApps = useAppsAlias; 
  export const useDrawer = useDrawerAlias;
  export const useTabs = useTabsAlias;
  export const useSecondary = useSecondaryAlias;

}

export default Burger;