import { PeerInfo } from "peer-info";
import { PeerId } from "peer-id";
import Multiaddr from "multiaddr";

declare module "libp2p" {
  export default class Libp2p {
    constructor(_options: any);
    dht: any;

    /**
     * Dials to the provided peer. If successful, the `PeerInfo` of the
     * peer will be added to the nodes `PeerBook`
     *
     * @param {PeerInfo|PeerId|Multiaddr|string} peer The peer to dial
     * @param {function(Error)} callback
     * @returns {void}
     */
    dial: (peer: PeerInfo | PeerId | Multiaddr | string, callback: any) => void;
  }
}
