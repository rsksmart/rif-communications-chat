import { libp2p } from 'libp2p'
// import Contact from './Contact';
import { fetchUserByName } from 'api/RIFNameService'
import { Contact, User } from 'models'
import { IAction } from 'store/storeUtils/interfaces'
import LocalStorage from 'utils/LocalStorage'
import { IUserState } from './UserStore'

export enum USER_ACTIONS {
  SET_CONTACTS = 'SET_CONTACTS',
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

const persistence = LocalStorage.getInstance()

export interface IChatPayload {
  readonly contact: Contact
  readonly message?: string
}

export interface IContactsPayload {
  readonly contacts: Contact[]
}

export interface INodePayload {
  user: User
  clientNode: libp2p
}

export type UserPayload = IChatPayload & IContactsPayload & INodePayload

export interface UserAction extends IAction<UserPayload> {
  type: USER_ACTIONS
}

export const getContact = () => (rnsName: string, state: IUserState) => {
  const { contacts } = state
  const contact = contacts.find(c => c.rnsName === rnsName)
  return contact
}

export const checkUserExists = rnsName => {
  return new Promise(resolve => {
    fetchUserByName(rnsName)
      .then(publicKey => resolve(!!publicKey))
      .catch(() => resolve(false))
  })
}

export const getUserPubKey = rnsName => {
  return fetchUserByName(rnsName)
}

export const addContact = (
  contacts: Contact[],
  contact: Contact,
): Contact[] => {
  const newContacts: Contact[] = [...contacts]
  if (!newContacts.find((c: Contact) => c.publicKey === contact.publicKey)) {
    newContacts.push(contact)
    newContacts.sort((a, b) => {
      if (a.rnsName && b.rnsName) return a.rnsName < b.rnsName ? -1 : 1
      if (!a.rnsName && !b.rnsName) return a.publicKey < b.publicKey ? -1 : 1
      if (!a.rnsName) return -1
      return 1
    })
    persistence.setItem('contacts', newContacts)
  }
  return newContacts
}

export const updateContactsWithMessage = (contacts, payload): Contact[] => {
  const { contact, message } = payload
  const { publicKey } = contact
  const existingContact = [...contacts].find(
    (c: Contact) => c.publicKey === publicKey,
  )

  const chat = [...(existingContact || contact).chat, message]
  const newContact = existingContact || contact
  newContact.chat = chat
  const newContacts = existingContact ? contacts : [...contacts, newContact]

  persistence.setItem('contacts', newContacts)
  return newContacts
}


export const incrementSentMsgs = (sentMsgs: number): number => sentMsgs += 1