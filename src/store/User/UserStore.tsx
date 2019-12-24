import React, { useReducer, Dispatch } from 'react';

import { User, Contact } from 'models/';
import userReducer from './userReducer';
import { Actions } from './userActions';

export interface IUseState {
  user: User | undefined;
  contacts: Contact[];
}

interface IUserStoreProps {
  state: IUseState;
  dispatch: Dispatch<Actions>;
}

export const initialState: IUseState = {
  user: undefined,
  contacts: [],
};

const UserStore = React.createContext({} as IUserStoreProps);

export const UserStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = { state, dispatch };
  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export default UserStore;
