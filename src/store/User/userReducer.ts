import LocalStorage from 'utils/LocalStorage'
import Logger from 'utils/Logger'
import {
  addContact,
  updateContactsWithMessage,
  USER_ACTIONS,
  UserAction,
  UserPayload,
  IChatPayload,
  IContactsPayload,
  INodePayload,
  incrementSentMsgs,
} from './userActions'
import { initialState, IUserState } from './UserStore'

const persistence = LocalStorage.getInstance()
const logger = Logger.getInstance()

const userReducer = (state = initialState, action: UserAction) => {
  const { type, payload } = action
  const userAction = userActions[type]
  if (!!userAction) logger.debug('userReducer -> action', action)
  const newState = (!!userAction && userAction(state, payload)) || state

  return newState
}
export default userReducer

type IUserActions = {
  [key in USER_ACTIONS]: (state: IUserState, payload: UserPayload) => IUserState
}

const {
  ADD_CONTACT,
  LOGOUT,
  RECEIVE_MESSAGE,
  SET_CONTACTS,
  SEND_MESSAGE,
  CREATE_USER_NODE,
  CONNECT_TO_NODE,
  ADD_USER,
  CREATE_USER,
  SET_CLIENT,
} = USER_ACTIONS

const userActions: IUserActions = {
  [SET_CONTACTS]: (state, payload: IContactsPayload) => {
    const { contacts } = payload
    return {
      ...state,
      contacts,
    }
  },
  [ADD_CONTACT]: (state, payload: IChatPayload) => {
    const { contact } = payload
    const { contacts } = state
    return contact
      ? {
        ...state,
        contacts: addContact(contacts, contact),
      }
      : state
  },
  [SET_CLIENT]: (state, payload: INodePayload) => {
    const { user, clientNode } = payload
    if (user.rnsName) persistence.setItem('rnsName', user.rnsName)
    return {
      ...state,
      clientNode,
      user,
    }
  },
  [RECEIVE_MESSAGE]: (
    state,
    payload: IChatPayload,
  ) => {
    const { contacts } = state
    const newContacts = updateContactsWithMessage(contacts, payload)
    return {
      ...state,
      contacts: newContacts,
    }
  },
  [SEND_MESSAGE]: (state, payload: IContactsPayload) => {
    const { contacts, sentMsgs } = state
    const newContacts = updateContactsWithMessage(contacts, payload)
    return {
      ...state,
      sentMsgs: incrementSentMsgs(sentMsgs),
      contacts: newContacts,
    }
  },
  [LOGOUT]: (_state, _payload) => {
    persistence.clear()
    return initialState
  },
  [CREATE_USER_NODE]: (state, _payload) => state,
  [CONNECT_TO_NODE]: (state, _payload) => state,
  [ADD_USER]: (state, _payload) => state,
  [CREATE_USER]: (state, _payload) => state,
}

