import React, { Dispatch, useReducer } from 'react';

import { Action } from './appActions';
import appReducer from './appReducer';

export interface IAppMessage {
  isError?: boolean;
  isLoading?: boolean;
  message?: string;
}

interface IAppState {
  message: IAppMessage;
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
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = { state, dispatch };
  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
};

export default AppStore;
