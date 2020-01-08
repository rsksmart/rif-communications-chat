import { createPeerIdFromPublicKey, createPeerInfo } from 'api/RIFcomms';
import Message from 'models/Message';
import Multiaddr from 'multiaddr';
import { PeerInfo } from 'peer-info';
import { IUserInfo } from 'types';
// import { getName } from 'services/UserService';

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

// export const createContactFromPublicKey = async (publicKey: string) => {
//   const [rnsName] = await getName(publicKey);

//   return new Contact({
//     publicKey,
//     rnsName: rnsName.substring(0, rnsName.length - 4),
//   });
// };
