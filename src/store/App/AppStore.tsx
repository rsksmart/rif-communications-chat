import React, { Dispatch } from 'react';

import { Action } from './appActions';
import appReducer from './appReducer';
import Middleware from 'store/middleware/middleware';

export interface IMessageState {
  isError?: boolean;
  isLoading?: boolean;
  message?: string;
}

interface IAppState {
  message: IMessageState;
}

interface IAppStoreProps {
  state: {
    message: IAppState;
  };
  dispatch: Dispatch<Action>;
}

export const initialState: IAppState = {
  message: {},
};

const AppStore = React.createContext({} as IAppStoreProps | any);

export const AppStoreProvider = ({ children }) => {
  const { useMiddleware } = Middleware.getInstance();

  const [state, dispatch] = useMiddleware(appReducer, initialState);

  const value = { state, dispatch };
  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
};

export default AppStore;
