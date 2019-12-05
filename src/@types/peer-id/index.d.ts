// TODO: CHECK THE ACTUAL IMPLEMENTATION AND CREATE RIGHT TYPINGs

declare module "peer-id" {
  class PeerId {
    constructor(id: any, privKey: any, pubKey: any);
    id: CID;
    privKey: string;
    pubKey: string;
    marshalPubKey: () => any;
    marshalPrivKey: () => any;
    marshal: (excludePriv?: boolean) => any;
    toB58String: () => string;
  }
  class PeerIdWithIs extends PeerId {}
  export const createWithKeyChain: (
    keychain: any,
    keyname: any,
    opts: any,
    callback: (err: Error, peer: PeerId) => void
  ) => void;

  //export const create: (_options: any) => Promise<PeerId>;
  export const create: (
    _options: any,
    callback: (err: Error, peer: PeerId) => void
  ) => void;

  export const createFromPubKey: (
    key: string | Buffer,
    callback: (err: Error, peer: PeerId) => void
  ) => void;

  export const createFromJSON: (
    obj: any,
    callback: (err: Error, peer: PeerId) => void
  ) => void;
}
