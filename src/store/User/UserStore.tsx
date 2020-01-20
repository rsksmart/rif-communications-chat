import React, { Dispatch } from 'react';
import libp2p from 'libp2p';

import { User, Contact } from 'models/';
import userReducer from './userReducer';
import { UserAction } from './userActions';
import Middleware from 'store/storeUtils/middleware';

//TODO: separate not-user-connection related stuff out
export interface IUserState {
  user: User | undefined;
  clientNode?: libp2p;
  contacts: Contact[];
  isConnected?: boolean;
  sentMsgs: number;
}

interface IUserStoreProps {
  state: IUserState;
  dispatch: Dispatch<UserAction>;
}

export const initialState: IUserState = {
  user: undefined,
  contacts: [],
  sentMsgs: 0,
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
