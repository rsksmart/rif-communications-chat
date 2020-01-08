import React, { Dispatch } from 'react';

import { User, Contact } from 'models/';
import userReducer from './userReducer';
import { Action } from './userActions';
import Middleware from 'store/middleware/middleware';

export interface IUserState {
  user: User | undefined;
  new_user: User | undefined;
  contacts: Contact[];
}

interface IUserStoreProps {
  state: IUserState;
  dispatch: Dispatch<Action>;
}

export const initialState: IUserState = {
  user: undefined,
  new_user: undefined,
  contacts: [],
};

const UserStore = React.createContext({} as IUserStoreProps | any);

export const UserStoreProvider = ({ children }) => {
  const { useMiddleware } = Middleware.getInstance();

  const [state, dispatch] = useMiddleware(
    'UserState',
    userReducer,
    initialState,
  );

  const value = { state, dispatch };
  return <UserStore.Provider value={value}>{children}</UserStore.Provider>;
};

export default UserStore;
