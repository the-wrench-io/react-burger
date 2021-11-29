import React from 'react';

import * as API from './AppAPI';
import AppSessionData from './AppSessionData';
import { AppReducer, AppReducerDispatch } from './AppSessionReducer';

import { DrawerProvider } from './drawer/DrawerContext';
import { TabsProvider } from './tabs/TabsContext';
import { SecondaryProvider } from './secondary/SecondaryContext';
import { Container } from '../layout';


const AppContext = React.createContext<API.AppContextType>({
  session: {} as API.AppSession,
  actions: {} as API.AppActions,
});

const sessionData = new AppSessionData({ active: "" });


interface AppProviderProps {
  drawerOpen?: boolean;
  appId?: API.AppId;
  children: API.App<any>[];
}


const getAppId = (props: AppProviderProps): API.AppId => {
  if (props.appId) {
    return props.appId;
  }

  if (props.children.length === 0) {
    throw new Error("Define at least one application!");
  }

  return props.children[0].id;
}


const getApp = (children: API.App<any>[], session: API.AppSession) => {
  const appsToUse = children.filter(app => app.id === session.active);
  if (appsToUse.length !== 1) {
    throw new Error(`No application with id: '${session.active}'!`);
  }
  return appsToUse[0];
}

const CreateContainer: React.FC<{ app: API.App<any> }> = ({ app }) => {
  const Main = React.useMemo(() => app.components.primary, [app]);
  const Secondary = React.useMemo(() => app.components.secondary, [app]);
  const Toolbar = React.useMemo(() => app.components.toolbar, [app]);

  console.log(`App Container/Layout Init: '${app.id}'`);
  return (
    <Container main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} />
  );
}


const AppInit: React.FC<{ children: API.App<any>[] }> = ({ children }) => {
  const { session } = useApps();
  const app = getApp(children, session);

  const [createContext, getContext] = app.state;
  const { restorePoint } = getContext();
  const container = React.useMemo(() => createContext((<CreateContainer app={app} />), restorePoint), [createContext, app, restorePoint]);

  console.log(`App Context Init: '${app.id}'`);
  return (<>{container}</>);
}


const AppProvider: React.FC<AppProviderProps> = (props: AppProviderProps) => {
  const apps = props.children;
  const [session, dispatch] = React.useReducer(AppReducer, sessionData.withActive(getAppId(props)));
  const actions = React.useMemo(() => new AppReducerDispatch(dispatch, apps), [dispatch, apps]);

  console.log("App Provider Init");
  return (<AppContext.Provider value={{ session, actions }}>
    <DrawerProvider drawerOpen={props.drawerOpen}>
      <TabsProvider appId={session.active}>
        <SecondaryProvider appId={session.active}>
          <AppInit children={props.children} />
        </SecondaryProvider>
      </TabsProvider>
    </DrawerProvider>
  </AppContext.Provider>);
};

const useApps = () => {
  const result: API.AppContextType = React.useContext(AppContext);
  return result;
}

export type { AppProviderProps };
export { useApps, AppProvider };
