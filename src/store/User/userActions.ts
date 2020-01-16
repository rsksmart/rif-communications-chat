// import Contact from './Contact';
import libp2p from 'libp2p';
import { PeerId } from 'peer-id';
import { PeerInfo } from 'peer-info';
import publicIp from 'public-ip';

import { IUserState } from './UserStore';
import { addUserName, fetchUserByName } from 'api/RIFNameService';
import { APP_ACTIONS } from 'store/App/appActions';
import { User } from 'models';
import {
  createKey,
  createPeerInfo,
  createNode as apiCreateNode,
  connectToNode as apiConnectToNode,
  createPeerIdFromJSON,
} from 'rif-communications';
import { IAction } from 'store/storeUtils/IAction';
import LocalStorage from 'api/LocalStorage';

// TODO: Extract services !!!
const BOOTNODE_ADDRESS: string = process.env.REACT_APP_BOOTNODE_ADDR
  ? process.env.REACT_APP_BOOTNODE_ADDR
  : '/ip4/127.0.0.1/tcp/57628/ws/ipfs/16Uiu2HAmHvtqJsjkztWXxwrBzCLHEYakmGAH9HJkkJnoKdyrXvNw';

export enum USER_ACTIONS {
  SAY_HELLO = 'SAY_HELLO',
  SETUP_USER = 'SETUP_USER',
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
}

const localStorage = LocalStorage.getInstance();

export interface UserAction extends IAction {
  type: USER_ACTIONS;
}

export const sayHeloToUser = (initialState: IUserState | any) => {
  const { user } = initialState;
  if (user) return `Hello ${user.rnsName}`;
};

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
  localStorage.setItem('keystore', JSON.stringify(peer));
  const user = await connectUser(peer, rnsName, dispatch);
  addUser(user, dispatch, action);
};

export const setupUser = async (keystore, dispatch) => {
  const rnsName = localStorage.getItem('rnsName');
  const peer: PeerId = await createPeerIdFromJSON(keystore);
  await connectUser(peer, rnsName, dispatch);
};

const connectUser = async (peer: PeerId, rnsName: string, dispatch: any) => {
  const peerInfo: PeerInfo = await createPeerInfo(peer);
  const user = new User({ pi: peerInfo, rnsName });
  const node: libp2p = await createNode(user);
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

const createNode = async (user: User) => {
  try {
    return apiCreateNode(user.pi, await publicIp.v4(), 80, processKadMsg);
  } catch (e) {
    // At least start with localhost if public IP can not be obtained
    return apiCreateNode(user.pi, '127.0.0.1', 80, processKadMsg);
  }
};

const processKadMsg = (kadMsgObj: any) => {
  // let { contacts } = this.state;
  // let contact = contacts.find(
  //   contact => contact.peerInfo?.id?.publicKey === kadMsgObj.sender,
  // );
  // if (!contact) {
  //   contact = await createContactFromPublicKey(kadMsgObj.sender);
  //   contacts = [...contacts, contact].sort((a, b) => {
  //     if (a.rnsName && !b.rnsName) return a.publicKey < b.publicKey ? -1 : 1;
  //     else if (!a.rnsName) return -1;
  //     else if (!b.rnsName) return 1;
  //     return a.rnsName < b.rnsName ? -1 : 1;
  //   });
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }
  // const msg = new Message({
  //   content: kadMsgObj.msg,
  //   sender: MESSAGE_SENDER.THEM,
  // });
  // this.addMessage(msg, contact);
  // this.setState({ contacts });
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
