import libp2p from 'libp2p'
import React, { Dispatch } from 'react'

import { Contact, User } from 'models/'
import Middleware from 'store/storeUtils/middleware'
import { UserAction } from './userActions'
import userReducer from './userReducer'

export interface IUserState {
  user?: User
  clientNode?: libp2p
  contacts: Contact[]
  isConnected?: boolean
  sentMsgs: number
  isSync: boolean
}

interface IUserStoreProps {
  state: IUserState
  dispatch: Dispatch<UserAction>
}

export const initialState: IUserState = {
  user: undefined,
  contacts: [],
  sentMsgs: 0,
  isSync: true
}

const UserStore = React.createContext({} as IUserStoreProps | any)

export const UserStoreProvider = ({ children }) => {
  const { useMiddleware } = Middleware.getInstance()

  const [state, dispatch] = useMiddleware(
    'UserState',
    userReducer,
    initialState,
  )

  const value = { state, dispatch }
  return <UserStore.Provider value={value}>{children}</UserStore.Provider>
}

export default UserStore
