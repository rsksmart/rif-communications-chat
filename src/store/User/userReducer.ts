import { Contact, Message } from 'models';
import LocalStorage from 'utils/LocalStorage';
import Logger from 'utils/Logger';
import {
  addContact,
  updateContactsWithMessage,
  USER_ACTIONS,
  UserAction,
} from './userActions';
import { initialState, IUserState } from './UserStore';

const persistence = LocalStorage.getInstance();
const logger = Logger.getInstance();

const userReducer = (state = initialState, action: UserAction) => {
  const { type, payload } = action;
  const userAction = userActions[type];
  if (!!userAction) logger.debug('userReducer -> action', action);
  const newState = (!!userAction && userAction(state, payload)) || state;

  return newState;
};
export default userReducer;

type IUserActions = {
  [key in USER_ACTIONS]: (state: IUserState, payload: any) => IUserState;
};

const {
  ADD_CONTACT,
  LOGOUT,
  RECEIVE_MESSAGE,
  SET_CONTACTS,
  SEND_MESSAGE,
  ERROR,
  CREATE_USER_NODE,
  CONNECT_TO_NODE,
  ADD_USER,
  CREATE_USER,
  SET_CLIENT,
} = USER_ACTIONS;

const userActions: IUserActions = {
  [SET_CONTACTS]: (state, payload) => {
    const { contacts } = payload;
    return {
      ...state,
      contacts,
    };
  },
  [ADD_CONTACT]: (state, payload) => {
    const { contact } = payload;
    const { contacts } = state;
    return contact
      ? {
          ...state,
          contacts: addContact(contacts, contact),
        }
      : state;
  },
  [SET_CLIENT]: (state, payload) => {
    const { user, clientNode } = payload;
    persistence.setItem('rnsName', user.rnsName);
    return {
      ...state,
      clientNode,
      user,
    };
  },
  [RECEIVE_MESSAGE]: (
    state,
    payload: { contact: Contact; message: Message },
  ) => {
    if (!payload.contact) return state;

    const { contacts } = state;
    const newContacts = updateContactsWithMessage(contacts, payload);
    return {
      ...state,
      contacts: newContacts,
    };
  },
  [SEND_MESSAGE]: (state, payload) => {
    const { contacts } = state;
    const newContacts = updateContactsWithMessage(contacts, payload);
    return {
      ...state,
      sentMsgs: state.sentMsgs + 1,
      contacts: newContacts,
    };
  },
  [LOGOUT]: (_state, _payload) => {
    persistence.clear();
    return initialState;
  },

  [ERROR]: (state, _payload) => state,
  [CREATE_USER_NODE]: (state, _payload) => state,
  [CONNECT_TO_NODE]: (state, _payload) => state,
  [ADD_USER]: (state, _payload) => state,
  [CREATE_USER]: (state, _payload) => state,
};
