import { IUserInfo } from "types";

export interface IContactParams {
  rnsName?: string;
  publicKey: string;
  multiaddr: string;
  chat?: string[];
}

export default class Contact implements IUserInfo {
  rnsName?: string;
  publicKey: string;
  multiaddr: string;
  chat: string[];

  constructor({ rnsName, publicKey, multiaddr, chat }: IContactParams) {
    this.rnsName = rnsName;
    this.publicKey = publicKey;
    this.multiaddr = multiaddr;
    this.chat = chat || [];
  }
}
