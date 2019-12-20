import React, { useReducer, Dispatch } from 'react';

import User from './User';
import userReducer from './UserReducer';
import { Actions } from './UserActions';

export interface IUseState {
  user: User | undefined;
}

interface IContextProps {
  state: IUseState;
  dispatch: Dispatch<Actions>;
}

export const initialState: IUseState = { user: undefined };

const UserStore = React.createContext({} as IContextProps);

export const UserStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = { state, dispatch };
  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export default UserStore;
