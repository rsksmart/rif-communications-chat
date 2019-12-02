import { PeerInfo } from "peer-info";
import crypto from "libp2p-crypto";
import { IUserInfo } from "types";

export interface IUserParams {
  rnsName?: string | null;
  pi: PeerInfo;
}

export default class User implements IUserInfo {
  public rnsName?: string | null;
  public pi: PeerInfo;

  constructor({ rnsName, pi }: IUserParams) {
    this.rnsName = rnsName;
    this.pi = pi;
  }

  get publicKey() {
    return crypto.keys
      .marshalPublicKey(this.pi.id._pubKey, "secp256k1")
      .toString("base64");
  }
}
