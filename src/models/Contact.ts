import { createPeerIdFromPublicKey, createPeerInfo } from "libs/RIFcomms";
import Message from "models/Message";
import Multiaddr from "multiaddr";
import { PeerInfo } from "peer-info";
import { IUserInfo } from "types";

export interface IContactParams {
  rnsName?: string;
  publicKey: string;
  multiaddr: string;
  chat?: Message[];
}

export default class Contact implements IUserInfo {
  rnsName?: string;
  peerInfo?: PeerInfo;
  publicKey: string;
  chat: Message[];

  constructor({ rnsName, publicKey, multiaddr, chat }: IContactParams) {
    this.rnsName = rnsName;
    this.chat = chat || [];
    this.publicKey = publicKey;
    createPeerIdFromPublicKey(publicKey).then(peerId => {
      createPeerInfo(peerId).then(pInfo => {
        this.peerInfo = pInfo;
        this.peerInfo.multiaddrs.add(new Multiaddr(multiaddr));
      });
    });
  }
}
