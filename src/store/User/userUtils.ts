import { Contact } from 'models'
import { IContactParams } from 'models/Contact'
import { PeerId } from 'peer-id'
import { Dispatch } from 'react'
import { APP_ACTIONS } from 'store/App/appActions'
import { IAction, IActionPayload } from 'store/storeUtils/interfaces'
import { IChatPayload, USER_ACTIONS } from './userActions'
import { setupUser } from './userController'
import { sendMsg } from 'rif-communications'
import { libp2p } from 'libp2p'

export interface IUserRecData {
  keystore: PeerId
  contacts: Contact[]
}
export const recoverUser = async (
  userRecData: IUserRecData,
  dispatch: Dispatch<IAction<IActionPayload>>,
  onEnd?: Function,
) => {
  const { keystore, contacts } = userRecData
  dispatch({
    type: APP_ACTIONS.SET_IS_LOADING,
    payload: { isLoading: true, message: 'Recovering user...' },
  })
  try {
    const payload = await setupUser(
      keystore,
      receiveMessage(dispatch)
    )
    dispatch({ type: USER_ACTIONS.SET_CLIENT, payload })
    const newContacts = contacts
      ? await Promise.all(
        contacts.map(async (contact: IContactParams) => await Contact.new(contact)),
      )
      : []
    dispatch({
      type: USER_ACTIONS.SET_CONTACTS,
      payload: {
        contacts: newContacts,
      },
    })
  } catch (err) {
    const { message } = err
    dispatch({
      type: APP_ACTIONS.SET_MESSAGE, payload: {
        isError: true,
        message
      }
    })
  } finally {
    dispatch({
      type: APP_ACTIONS.SET_IS_LOADING,
      payload: { isLoading: false },
    })
    onEnd && onEnd()
  }
}

export const receiveMessage = (dispatch: Dispatch<IAction<IActionPayload>>) => (payload: IChatPayload) => {
  dispatch({ type: USER_ACTIONS.CHECK_SYNC_DATA, payload })
  dispatch({ type: USER_ACTIONS.CHECK_SYNC_REQ, payload })
  dispatch({
    type: USER_ACTIONS.RECEIVE_MESSAGE,
    payload,
  })
}

export const sendSyncRequest = async (contacts: Contact[], clientNode: libp2p, sentMsgs: number): Promise<void> => {
  return contacts.forEach(async (contact) => {
    const { peerInfo } = contact
    const lastMessageTime = contact.lastMessage?.timestamp || 0
    const content = JSON.stringify({ sync_request: { timestamp: lastMessageTime } })

    await sendMsg(clientNode, peerInfo, content, sentMsgs, true)
  })
}