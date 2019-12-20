import React, { useReducer, Dispatch } from 'react';

import { IUserInfo } from 'types';
import userReducer from './UserReducer';
import { USER_ACTIONS } from './UserActions';

export interface IUseState {
  user: IUserInfo | undefined;
}

interface IContextProps {
  state: IUseState;
  dispatch: Dispatch<{ type: USER_ACTIONS }>;
}

export const initialState: IUseState = { user: undefined };

const UserStore = React.createContext({} as IContextProps);

export const UserStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = { state, dispatch };
  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export default UserStore;
