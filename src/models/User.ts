import crypto from 'libp2p-crypto';
import { PeerInfo } from 'peer-info';
import { IUserInfo } from 'types';

export interface IUserParams {
  rnsName?: string | null;
  pi: PeerInfo;
  host?: string | null;
}

export default class User implements IUserInfo {
  public rnsName?: string | null;
  public pi: PeerInfo;
  public host?: string | null;
  public port?: number | null;

  constructor({ rnsName, pi, host }: IUserParams) {
    this.rnsName = rnsName;
    this.pi = pi;
    this.host = host;
    this.port = 80;
  }

  get publicKey() {
    return crypto.keys
      .marshalPublicKey(this.pi.id.pubKey, 'secp256k1')
      .toString('base64');
  }
}
