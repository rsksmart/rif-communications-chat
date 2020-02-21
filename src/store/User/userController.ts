import { createRNS } from 'api/RIFNameService';
import libp2p from 'libp2p';
import { Message, User } from 'models';
import { createContactFromPublicKey } from 'models/Contact';
import { MESSAGE_SENDER } from 'models/Message';
import { PeerId } from 'peer-id';
import { PeerInfo } from 'peer-info';
import publicIp from 'public-ip';
import {
  connectToNode,
  createKey,
  createNode,
  createPeerIdFromJSON,
  createPeerInfo,
} from 'rif-communications'
import LocalStorage from 'utils/LocalStorage'
import { INodePayload, IChatPayload } from './userActions'
import Logger from 'utils/Logger'

const logger = Logger.getInstance()
const BOOTNODE_ADDRESS: string = process.env.REACT_APP_BOOTNODE_ADDR
  ? process.env.REACT_APP_BOOTNODE_ADDR
  : '/ip4/127.0.0.1/tcp/57628/ws/ipfs/16Uiu2HAmHvtqJsjkztWXxwrBzCLHEYakmGAH9HJkkJnoKdyrXvNw'

const persistence = LocalStorage.getInstance()

export const createUser = async (
  rnsName: string,
  onMessageReceived: any,
): Promise<any> => {
  const peer = await createKey()
  const payload = await connectUser(peer, rnsName, onMessageReceived)
  const {
    user: { publicKey },
  } = payload
  await createRNS(rnsName, publicKey)
  persistence.setItem('keystore', JSON.stringify(peer))
  return payload
}

export const setupUser = async (
  keystore: PeerId,
  onMessageReceived: any,
): Promise<User> => {
  const rnsName = persistence.getItem('rnsName')
  const peer: PeerId = await createPeerIdFromJSON(keystore)
  return connectUser(peer, rnsName, onMessageReceived)
}

const connectUser = async (
  peer: PeerId,
  rnsName: string,
  onMessageReceived: any,
): Promise<any> => {
  const peerInfo: PeerInfo = await createPeerInfo(peer)
  const user = new User({ pi: peerInfo, rnsName })

  const node: libp2p = await createKdmNode(user, onMessageReceived)
  const payload: INodePayload = {
    clientNode: node,
    user,
  }

  await connectToKdmNode(node)
  return payload
}

const createKdmNode = async (user: User, onMessageReceived: any) => {
  try {
    return await createNode(
      user.pi,
      await publicIp.v4(),
      80,
      processMessage(onMessageReceived),
    )
  } catch (e) {
    // At least start with localhost if public IP can not be obtained
    return createNode(
      user.pi,
      '127.0.0.1',
      80,
      processMessage(onMessageReceived),
    )
  }
}

const processMessage = (onMessageReceived: (payload: IChatPayload) => {}) => (msgObj: any) => {
  const message = new Message({
    content: msgObj.msg,
    sender: MESSAGE_SENDER.THEM,
    timestamp: Date.now(),
  })
  createContactFromPublicKey(msgObj.sender)
    .then(contact => onMessageReceived({
      contact,
      message,
    }))
    .catch(err => {
      logger.error('Could not process kademlia message', err)
    })
}

export const connectToKdmNode = async clientNode => {
  if (clientNode) {
    await connectToNode(clientNode, BOOTNODE_ADDRESS)
  }
}