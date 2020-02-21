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
  ISyncPayload,
  syncMessagesForContact,
  getMissingMsgs,
} from './userActions'
import { initialState, IUserState } from './UserStore'
import { sendMsg } from 'rif-communications'
import { Message, Contact } from 'models'
import { MESSAGE_SENDER } from 'models/Message'

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
  START_SYNC,
  CHECK_SYNC_REQ,
  CHECK_SYNC_DATA
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
  [SEND_MESSAGE]: (state, payload: IChatPayload) => {
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
  [START_SYNC]: (state, payload: ISyncPayload) => {
    const { isSync } = payload
    return {
      ...state,
      isSync: isSync || false
    }
  },
  [CHECK_SYNC_DATA]: (state, payload: IChatPayload) => {
    const { contacts } = state
    const { message, contact } = payload

    const ownContact = contacts.find((c: Contact) => c.publicKey === contact.publicKey)
    if (message && ownContact) {
      const { content } = message

      try {
        const data = JSON.parse(content)
        const { sync_data } = data
        const theirChat = sync_data.map((msg: Message) => {
          return new Message({
            content: msg.content,
            sender: MESSAGE_SENDER.THEM,
            timestamp: msg.timestamp
          })
        })

        ownContact.chat = syncMessagesForContact(ownContact, theirChat)
        ownContact.lastSync = Date.now()
      } catch (_) { /** Not a Sync Data message */ }
    }
    return state
  },
  [CHECK_SYNC_REQ]: (state, payload: IChatPayload) => {
    const { contacts } = state
    const { message, contact } = payload

    const ownContact = contacts.find(c => c.publicKey === contact.publicKey)
    if (message && ownContact) {
      const { content } = message

      try {
        const msgContent = JSON.parse(content)
        const { sync_request } = msgContent
        const theirLastMsgTime = sync_request.timestamp
        if (sync_request && theirLastMsgTime) {
          const messages = [...ownContact.chat]
          const lastMessage = messages[messages.length - 1]
          const ownLastMsgTime = lastMessage?.timestamp
          const missingMsgs: {
            content: string
            timestamp: number
          }[] = getMissingMsgs(messages, theirLastMsgTime, ownLastMsgTime)

          if (missingMsgs.length) {
            const { clientNode, sentMsgs } = state
            const { peerInfo } = ownContact
            const message = JSON.stringify({ sync_data: missingMsgs })

            sendMsg(clientNode, peerInfo, message, sentMsgs, false)
          }
        }
      } catch (_) { /** Not a Sync request message */ }
    }
    return state
  },
  [CREATE_USER_NODE]: (state, _payload) => state,
  [CONNECT_TO_NODE]: (state, _payload) => state,
  [ADD_USER]: (state, _payload) => state,
  [CREATE_USER]: (state, _payload) => state
}
