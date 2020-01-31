import libp2p from 'libp2p';
import React, { Dispatch } from 'react';

import { Contact, User } from 'models/';
import { IState } from 'store/storeUtils/interfaces';
import Middleware from 'store/storeUtils/middleware';
import { UserAction } from './userActions';
import userReducer from './userReducer';

export interface IUserState extends IState {
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
