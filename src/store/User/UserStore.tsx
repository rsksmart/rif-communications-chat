import React, { useReducer, Dispatch } from 'react';

import { User, Contact } from 'models/';
import userReducer from './userReducer';
import { Actions } from './userActions';

export interface IUserState {
  user: User | undefined;
  contacts: Contact[];
}

interface IUserStoreProps {
  state: IUserState;
  dispatch: Dispatch<Actions>;
}

export const initialState: IUserState = {
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
