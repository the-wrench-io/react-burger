import React from 'react';

import * as API from './SessionAPI';
import SessionData from './SessionData';
import { SessionReducer, SessionReducerDispatch } from './SessionReducer';
import { Container } from '../layout';


const SessionContext = React.createContext<API.SessionContextType>({
  session: {} as API.Session,
  actions: {} as API.SessionActions,
})

const sessionInit: SessionData = new SessionData({appId: ""})

interface SessionProviderProps {
  appId: string;
  drawerOpen?: boolean;
  children: {
    main: React.ReactElement;
    secondary: React.ReactElement;
    toolbar: React.ReactElement;
  }
}

const SessionProvider: React.FC<SessionProviderProps> = (props: SessionProviderProps) => {
  const [session, dispatch] = React.useReducer(SessionReducer, sessionInit.withAppId(props.appId).withDrawer(props.drawerOpen ? true : false));
  const actions = React.useMemo(() => new SessionReducerDispatch(dispatch), [dispatch]);
  
  return (<SessionContext.Provider key={props.appId} value={{ session, actions }}>
      <Container
        main={props.children.main}
        secondary={props.children.secondary}
        toolbar={props.children.toolbar}
      />
    </SessionContext.Provider>);
}

const useSession = () => {
  const result: API.SessionContextType = React.useContext(SessionContext);
  return result;
}

export type { SessionProviderProps };
export { SessionProvider, useSession };