import { IUserInfo } from "types";
import Message from "models/Message";

export interface IContactParams {
  rnsName?: string | null;
  publicKey: string;
  multiaddr: string;
  chat?: Message[];
}

export default class Contact implements IUserInfo {
  rnsName?: string | null;
  publicKey: string;
  multiaddr: string;
  chat: Message[];

  constructor({ rnsName, publicKey, multiaddr, chat }: IContactParams) {
    this.rnsName = rnsName;
    this.publicKey = publicKey;
    this.multiaddr = multiaddr;
    this.chat = chat || [];
  }
}
