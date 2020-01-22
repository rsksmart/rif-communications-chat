import { getDomainByPubKey } from 'api/RIFNameService';
import Message from 'models/Message';
import Multiaddr from 'multiaddr';
import { PeerInfo } from 'peer-info';
import { createPeerIdFromPublicKey, createPeerInfo } from 'rif-communications';
import { IUserInfo } from 'types';

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

  private constructor({ rnsName, publicKey, chat }: IContactParams) {
    this.rnsName = rnsName;
    this.chat = chat || [];
    this.publicKey = publicKey;
  }

  public static new = async (contactParams: IContactParams) => {
    const contact = new Contact(contactParams);
    const { publicKey, multiaddr } = contactParams;

    const peerId = await createPeerIdFromPublicKey(publicKey);
    contact.peerInfo = await createPeerInfo(peerId);
    if (multiaddr) {
      contact.peerInfo.multiaddrs.add(new Multiaddr(multiaddr));
    }

    return contact;
  };
}

export const createContactFromPublicKey = async (
  publicKey: string,
): Promise<Contact | null> => {
  try {
    const domains = await getDomainByPubKey(publicKey);
    if (!domains) throw new Error('Domain not Found');

    const [rnsDomain] = domains;
    const rnsName = rnsDomain.substring(0, rnsDomain.lastIndexOf('.rsk'));

    return Contact.new({
      publicKey,
      rnsName,
    });
  } catch (err) {
    const logger = (await import('utils/Logger')).default.getInstance();
    logger.error('Error when creating contact from public key:', err);
  }
  return null;
};
