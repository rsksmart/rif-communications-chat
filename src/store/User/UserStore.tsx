import React, { Dispatch } from 'react';
import libp2p from 'libp2p';

import { User, Contact } from 'models/';
import userReducer from './userReducer';
import { IUserAction } from './userActions';
import Middleware from 'store/storeUtils/middleware';

export interface IUserState {
  user: User | undefined;
  clientNode?: libp2p;
  contacts: Contact[];
  isConnected?: boolean;
}

interface IUserStoreProps {
  state: IUserState;
  dispatch: Dispatch<IUserAction>;
}

export const initialState: IUserState = {
  user: undefined,
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
