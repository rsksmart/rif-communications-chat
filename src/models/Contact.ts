import crypto from 'libp2p-crypto';
import { createPeerIdFromPublicKey, createPeerInfo } from 'libs/RIFcomms';
import Message from 'models/Message';
import Multiaddr from 'multiaddr';
import { PeerInfo, create } from 'peer-info';
import { createFromB58String } from 'peer-id';
import { IUserInfo } from 'types';
import { getName } from 'services/UserService';

export interface IContactParams {
  rnsName?: string;
  publicKey: string;
  multiaddr?: string;
  chat?: Message[];
}

export default class Contact implements IUserInfo {
  rnsName?: string;
  peerInfo: PeerInfo;
  publicKey: string;
  chat: Message[];

  constructor({ rnsName, publicKey, multiaddr, chat }: IContactParams) {
    this.rnsName = rnsName;
    this.chat = chat || [];
    this.publicKey = publicKey;
    createPeerIdFromPublicKey(publicKey).then(peerId => {
      createPeerInfo(peerId).then(pInfo => {
        this.peerInfo = pInfo;
        if (multiaddr) this.peerInfo.multiaddrs.add(new Multiaddr(multiaddr));
      });
    });
  }
}

export const createContactFromID = async (id: string) => {
  const pid = createFromB58String(id);
  const publicKey = crypto.keys
    .marshalPublicKey(pid.pubKey, 'secp256k1')
    .toString('base64');

  const [rnsName] = await getName(publicKey);
  return new Contact({
    publicKey,
    rnsName: rnsName.substring(0, rnsName.length - 4),
  });
};
