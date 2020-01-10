// import Contact from './Contact';
import libp2p from 'libp2p';
import { PeerId } from 'peer-id';
import { PeerInfo } from 'peer-info';
import publicIp from 'public-ip';

import { IUserState } from './UserStore';
import { addUserName } from 'api/RIFNameService';
import { APP_ACTIONS } from 'store/App/appActions';
import { User } from 'models';
import {
  createKey,
  createPeerInfo,
  createNode as apiCreateNode,
  connectToNode as apiConnectToNode,
} from 'api/RIFcomms';
import { IAction } from 'store/storeUtils/IAction';

const BOOTNODE_ADDRESS: string = process.env.REACT_APP_BOOTNODE_ADDR
  ? process.env.REACT_APP_BOOTNODE_ADDR
  : '/ip4/127.0.0.1/tcp/57628/ws/ipfs/16Uiu2HAmHvtqJsjkztWXxwrBzCLHEYakmGAH9HJkkJnoKdyrXvNw';

export enum USER_ACTIONS {
  SAY_HELLO = 'SAY_HELLO',
  CREATE_RNS = 'CREATE_RNS',
  ERROR = 'ERROR',
  CHECK_RNS = 'CHECK_RNS',
  CREATE_USER_NODE = 'CREATE_USER_NODE',
  SET_CLIENT_NODE = 'SET_CLIENT_NODE',
  CONNECT_TO_NODE = 'CONNECT_TO_NODE',
}

export interface IUserAction extends IAction {
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

export const addUser = (
  new_user: { rnsName; publicKey },
  dispatch: any,
  action: any,
) => {
  const { rnsName, publicKey } = new_user;
  addUserName(rnsName, publicKey)
    .then(user => dispatch({ type: action.type, payload: user }))
    .catch(err => dispatch({ type: APP_ACTIONS.SET_ERROR, payload: err }));
};

const createUser = async (rnsName: string, state, dispatch) => {
  // await setupUser(RifCommunications.createKey);

  // const { user, node } = await createPeer(pidCreatFunc, keystore);

  const peerId: PeerId = await createKey();
  const peerInfo: PeerInfo = await createPeerInfo(peerId);
  const user = new User({ pi: peerInfo, rnsName });
  const node: libp2p | undefined = await createNode(user);

  if (node) {
    dispatch({
      type: USER_ACTIONS.SET_CLIENT_NODE,
      payload: {
        clientNode: node,
        user,
      },
    });

    // useEffect(() => {
    //   if (
    //     !state.isConnected &&
    //     state.clientNode &&
    //     state.user &&
    //     state.keystore
    //   ) {
    //     dispatch({ type: USER_ACTIONS.CONNECT_TO_NODE });
    //   }
    // }, [state, dispatch]);
  }
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

export const connectToNode = async state => {
  if (state.clientNode) {
    await apiConnectToNode(state.clientNode, BOOTNODE_ADDRESS);
  }
};

export const createRns = async (rnsName, state, dispatch) => {
  await createUser(rnsName, state, dispatch);
};
