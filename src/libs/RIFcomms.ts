import libp2p from 'libp2p';
import KadDHT from 'libp2p-kad-dht';
import Mplex from 'libp2p-mplex';
import SECIO from 'libp2p-secio';
import WebRTCDirect from 'libp2p-webrtc-direct';
import WS from 'libp2p-websockets';
import Multiaddr from 'multiaddr';
import { create, createFromJSON, createFromPubKey, PeerId } from 'peer-id';
import { create as peer_info_create, PeerInfo } from 'peer-info';

export function connectToNode(
  origin: libp2p,
  destination: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    origin.dial(destination, (err, val) => {
      if (err) {
        throw err;
      } else {
        setTimeout(() => {
          resolve();
        }, 300);
      }
    });
  });
}

export function createPeerInfo(pId: PeerId): Promise<PeerInfo> {
  return new Promise<PeerInfo>((resolve, reject) => {
    peer_info_create(pId, (err: Error, peer: PeerInfo) => {
      if (err) {
        reject(err);
      } else {
        resolve(peer);
      }
    });
  });
}

export function createPeerIdFromJSON(): Promise<PeerId> {
  const jsonObject = JSON.parse(localStorage.getItem('keystore') || '{}');
  return new Promise<PeerId>((resolve, reject) => {
    createFromJSON(jsonObject, (err: Error, peerId: PeerId) => {
      if (err) {
        reject();
      } else {
        resolve(peerId);
      }
    });
  });
}

export function createPeerIdFromPublicKey(
  publicKey: string | Buffer,
): Promise<PeerId> {
  return new Promise<PeerId>((resolve, reject) => {
    createFromPubKey(publicKey, (err: Error, peerId: PeerId) => {
      if (err) {
        reject();
      } else {
        resolve(peerId);
      }
    });
  });
}

export function createKey(): Promise<PeerId> {
  const opts = {
    bits: 256,
    keyType: 'secp256k1',
  };
  return new Promise<PeerId>((resolve, reject) => {
    create(opts, (err: Error, peer: PeerId) => {
      if (err) {
        reject(err);
      } else {
        localStorage.setItem('keystore', JSON.stringify(peer));
        resolve(peer);
      }
    });
  });
}

export function sendMsg(
  client: libp2p,
  recipient: PeerInfo,
  message: string,
  msgNonce: number,
  partialAddressing?: boolean,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    client.dht.sendMessage(
      recipient.id,
      message,
      msgNonce,
      partialAddressing !== undefined ? partialAddressing : false,
      (err: Error) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      },
    );
  });
}

export function createNode(
  peerInfo: PeerInfo,
  host: string,
  port: number,
  sendMsgFunc: any,
  provider,
): Promise<libp2p> {
  let node: any;

  peerInfo.multiaddrs.add(
    new Multiaddr(`/ip4/${host}/tcp/${port}/http/p2p-webrtc-direct`),
  );
  node = new WebRTCDirectBundle({
    peerInfo,
  });

  return new Promise<libp2p>((resolve, reject) => {
    node.dht.registerListener(
      'kad-msg-received',
      (kadMsg: any) => {
        sendMsgFunc(kadMsg, provider);
      },
      () => {
        resolve(
          new Promise<libp2p>((resolve2, reject2) => {
            node.start((err: Error) => {
              if (err) {
                reject2(err);
              } else {
                resolve2(node);
              }
            });
          }),
        );
      },
    );
  });
}

class WebRTCDirectBundle extends libp2p {
  constructor(options) {
    const webRTCDirect = new WebRTCDirect();
    const upgrader = {
      upgradeInbound: (maConn: () => {}) => maConn,
      upgradeOutbound: (maConn: () => {}) => maConn,
    };
    const ws = new WS({ upgrader });

    const defaults = {
      config: {
        dht: {
          enabled: true,
          kBucketSize: 20,
        },
        peerDiscovery: {
          autoDial: false,
        },
      },
      modules: {
        connEncryption: [SECIO],
        dht: KadDHT,
        streamMuxer: [Mplex],
        transport: [ws, webRTCDirect],
      },
    };
    super({ ...options, ...defaults });
  }
}
