import { PeerId, create } from "peer-id";

export function createKey(keyname: string): Promise<PeerId> {
  const opts = {
    bits: 256,
    keyType: "secp256k1"
  };
  return create(opts);
}
