// import Contact from './Contact';
import { fetchUserByName } from 'api/RIFNameService';
import { Contact } from 'models';
import { IAction } from 'store/storeUtils/interfaces';
import LocalStorage from 'utils/LocalStorage';
import { IUserState } from './UserStore';

export enum USER_ACTIONS {
  SET_CONTACTS = 'SET_CONTACTS',
  ERROR = 'ERROR',
  CREATE_USER_NODE = 'CREATE_USER_NODE',
  CONNECT_TO_NODE = 'CONNECT_TO_NODE',
  ADD_USER = 'ADD_USER',
  CREATE_USER = 'CREATE_USER',
  LOGOUT = 'LOGOUT',
  ADD_CONTACT = 'ADD_CONTACT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  SET_CLIENT = 'SET_CLIENT',
}

const persistence = LocalStorage.getInstance();

export interface UserAction extends IAction {
  type: USER_ACTIONS;
}

export const getContact = () => (rnsName: string, state: IUserState) => {
  const { contacts } = state;
  const contact = contacts.find(c => c.rnsName === rnsName);
  return contact;
};

export const checkUserExists = rnsName => {
  return new Promise(resolve => {
    fetchUserByName(rnsName)
      .then(publicKey => resolve(!!publicKey))
      .catch(() => resolve(false));
  });
};

export const getUserPubKey = rnsName => {
  return fetchUserByName(rnsName);
};

// TODO: state should not be here
export const addContact = (state, contact: Contact): Contact[] => {
  const { contacts } = state;
  let newContacts: Contact[] = [...contacts];
  if (!state.contacts.find((c: Contact) => c.publicKey === contact.publicKey)) {
    // TODO: perhaps more efficient insert would be better than sort?
    newContacts.push(contact);
    newContacts.sort((a, b) => {
      if (a.rnsName && !b.rnsName) return a.publicKey < b.publicKey ? -1 : 1;
      else if (!a.rnsName) return -1;
      else if (!b.rnsName) return 1; // FIXME: never reached as !(A&&!B) -> [[!A,!B], [!A,B], [A,B]]
      return a.rnsName < b.rnsName ? -1 : 1;
    });
    persistence.setItem('contacts', newContacts);
  }
  return newContacts;
};

export const updateContactsWithMessage = (contacts, payload): Contact[] => {
  const { contact, message } = payload;
  const { chat, publicKey } = contact;
  contact.chat = [...chat, message];
  const newContacts = !!contacts.find((c: Contact) => c.publicKey === publicKey)
    ? contacts
    : [...contacts, contact];
  persistence.setItem('contacts', newContacts);
  return newContacts;
};
