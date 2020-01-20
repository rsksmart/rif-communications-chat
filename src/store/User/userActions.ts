// import Contact from './Contact';
import { addUserName, fetchUserByName } from 'api/RIFNameService';
import libp2p from 'libp2p';
import { Contact, Message, User } from 'models';
import { createContactFromPublicKey } from 'models/Contact';
import { MESSAGE_SENDER } from 'models/Message';
import { PeerId } from 'peer-id';
import { PeerInfo } from 'peer-info';
import publicIp from 'public-ip';
import {
  connectToNode as apiConnectToNode,
  createKey,
  createNode as apiCreateNode,
  createPeerIdFromJSON,
  createPeerInfo,
  sendMsg,
} from 'rif-communications';
import { APP_ACTIONS } from 'store/App/appActions';
import { IAction } from 'store/storeUtils/IAction';
import LocalStorage from 'utils/LocalStorage';
import { IUserState } from './UserStore';

// TODO: Extract services !!!
const BOOTNODE_ADDRESS: string = process.env.REACT_APP_BOOTNODE_ADDR
  ? process.env.REACT_APP_BOOTNODE_ADDR
  : '/ip4/127.0.0.1/tcp/57628/ws/ipfs/16Uiu2HAmHvtqJsjkztWXxwrBzCLHEYakmGAH9HJkkJnoKdyrXvNw';

export enum USER_ACTIONS {
  RESTORE_USER = 'RESTORE_USER',
  ERROR = 'ERROR',
  CHECK_RNS = 'CHECK_RNS',
  CREATE_USER_NODE = 'CREATE_USER_NODE',
  SET_CLIENT_NODE = 'SET_CLIENT_NODE',
  CONNECT_TO_NODE = 'CONNECT_TO_NODE',
  ADD_USER = 'ADD_USER',
  CREATE_USER = 'CREATE_USER',
  LOGOUT = 'LOGOUT',
  FETCH_RNS = 'FETCH_RNS',
  ADD_CONTACT = 'ADD_CONTACT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
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

export const addUser = (user: User, dispatch: any, action: any) => {
  const { rnsName, publicKey } = user;
  if (rnsName && publicKey) {
    addUserName(rnsName, publicKey)
      .then(user => dispatch({ type: action.type, payload: user }))
      .catch(err => dispatch({ type: APP_ACTIONS.SET_ERROR, payload: err }));
  }
};

export const createUser = async (rnsName, dispatch, action) => {
  const peer = await createKey();
  persistence.setItem('keystore', JSON.stringify(peer));
  const user = await connectUser(peer, rnsName, dispatch);
  addUser(user, dispatch, action);
};

export const setupUser = async (keystore, dispatch) => {
  const rnsName = persistence.getItem('rnsName');
  const peer: PeerId = await createPeerIdFromJSON(keystore);
  await connectUser(peer, rnsName, dispatch);
};

const connectUser = async (peer: PeerId, rnsName: string, dispatch: any) => {
  const peerInfo: PeerInfo = await createPeerInfo(peer);
  const user = new User({ pi: peerInfo, rnsName });
  const node: libp2p = await createNode(user, dispatch);
  if (node) {
    const payload = {
      clientNode: node,
      user,
    };
    dispatch({
      type: USER_ACTIONS.SET_CLIENT_NODE,
      payload,
    });
    await connectToNode(node);
  }
  return user;
};

const createNode = async (user: User, dispatch) => {
  try {
    return apiCreateNode(
      user.pi,
      await publicIp.v4(),
      80,
      processKadMsg(dispatch),
    );
  } catch (e) {
    // At least start with localhost if public IP can not be obtained
    return apiCreateNode(user.pi, '127.0.0.1', 80, processKadMsg(dispatch));
  }
};

const processKadMsg = dispatch => async (kadMsgObj: any) => {
  const message = new Message({
    content: kadMsgObj.msg,
    sender: MESSAGE_SENDER.THEM,
    timestamp: Date.now(),
  });
  const contact = await createContactFromPublicKey(kadMsgObj.sender);

  dispatch({
    type: USER_ACTIONS.RECEIVE_MESSAGE,
    payload: {
      message,
      contact,
    },
  });
};

export const connectToNode = async clientNode => {
  if (clientNode) {
    await apiConnectToNode(clientNode, BOOTNODE_ADDRESS);
  }
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
// TODO: state should not be here

export const addMessage = async (
  state: IUserState,
  message: Message,
  contact: Contact,
) => {
  const { clientNode } = state;
  if (message.sender === MESSAGE_SENDER.ME && contact.peerInfo) {
    await sendMsg(
      clientNode,
      contact.peerInfo,
      message.content,
      state.sentMsgs,
      true,
    ).catch(error => {
      console.log('Unable to dial contact, try to reconnect to bootnode');
      //Option number 1, try to reconnect if sending fails
      connectToNode(clientNode).catch(connErr => {
        console.log('Unable to reconnect to node');
      });
    });
  }
};
