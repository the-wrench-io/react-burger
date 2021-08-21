import React from 'react';

import { API } from './';
import SessionData from './SessionData';
import { Reducer, ReducerDispatch } from './Reducer';
import { Components } from './Components';


const Context = React.createContext<API.ContextType>({
  session: {} as API.Instance,
  actions: {} as API.Actions,
});

const sessionData = new SessionData({
  dimensions: { width: 0, height: 0 },
  drawer: { open: false, width: 0 }
});

const Provider: React.FC<{
  styles: { drawer: { width: number } },
  config: Session.Configuration
}> = (props) => {

  const [session, dispatch] = React.useReducer(Reducer, sessionData.withDrawer({ open: false, width: props.styles.drawer.width }));
  const actions = React.useMemo(() => new ReducerDispatch(dispatch), [dispatch]);

  return (
    <Context.Provider value={{ session, actions }}>
      <Components children={props.config} />
    </Context.Provider>
  );
};

const useContext = () => {
  const result: API.ContextType = React.useContext(Context);
  return result;
}

export { Provider, Context, useContext };