import React, { Component, createContext } from 'react';
import publicIp from 'public-ip';

import libp2p from 'libp2p';
import * as RifCommunications from 'libs/RIFcomms';
import User from 'models/User';
import { PeerId } from 'peer-id';
import { create, PeerInfo } from 'peer-info';
import Contact, { IContactParams, createContactFromID } from 'models/Contact';
import Message, { MESSAGE_SENDER } from 'models/Message';
import { sendMsg } from 'libs/RIFcomms';
import { addUserName } from '../services/UserService';
import { ROUTES, history } from 'routes';

interface IImportJson {
  rnsName: string;
  keystore: string;
  contacts: Contact[];
}
export interface IUserProvider {
  state: {
    readonly user?: User;
    readonly clientNode?: libp2p;
    contacts: Contact[];
    sentMsgs: number;
  };
  actions: {
    createUser: () => Promise<void>;
    changeRNS: (rnsName: string) => Promise<void>;
    addContact: (contact: Contact) => void;
    getContact: (pubKey: string) => Contact | undefined;
    addMessage: (message: Message, contact: Contact) => void;
    clearStorage: () => void;
    exportUser: () => string;
    importUser: (userJson: IImportJson) => void;
  };
}

const { Provider, Consumer } = createContext<IUserProvider>({
  actions: {
    createUser: () => {
      return new Promise(resolve => resolve());
    },
    changeRNS: () => {
      return new Promise(resolve => resolve());
    },
    addContact: () => {},
    getContact: () => undefined,
    addMessage: () => {},
    clearStorage: () => {},
    exportUser: () => '',
    importUser: () => {},
  },
  state: {
    clientNode: undefined,
    contacts: [],
    sentMsgs: 0,
    user: undefined,
  },
});

interface IUserProviderProps {}
interface IUserProviderState {
  contacts: Contact[];
  sentMsgs: number;
  user?: User;
  clientNode?: libp2p;
}

class UserProvider extends Component<IUserProviderProps, IUserProviderState> {
  constructor(props: object) {
    super(props);

    this.state = {
      contacts: [],
      sentMsgs: 0,
    };

    this.createUser = this.createUser.bind(this);
    this.changeRNS = this.changeRNS.bind(this);
    this.addContact = this.addContact.bind(this);
    this.getContact = this.getContact.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.exportUser = this.exportUser.bind(this);
    this.importUser = this.importUser.bind(this);
    this.processKadMsg = this.processKadMsg.bind(this);
  }

  public async componentDidMount() {
    const keystore = localStorage.getItem('keystore');
    if (keystore && keystore !== '') {
      await this.setupUser(
        RifCommunications.createPeerIdFromJSON,
        JSON.parse(keystore),
      );
    }

    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.setState({
      contacts: contacts.map((c: IContactParams) => new Contact(c)),
    });
    try {
      await this.connectToNode();
    } catch (e) {
      console.error(e);
    }
    // timeout to reconnect when you get disconnected - every 30 seconds
  }

  public render() {
    const { user } = this.state;
    const { createUser, changeRNS, clearStorage } = this;
    const { contacts } = this.state;
    const { clientNode } = this.state;
    const { sentMsgs } = this.state;
    const { addContact, getContact, addMessage } = this;
    const { exportUser, importUser } = this;

    return (
      <Provider
        value={{
          actions: {
            createUser,
            changeRNS,
            addContact,
            getContact,
            addMessage,
            clearStorage,
            exportUser,
            importUser,
          },
          state: {
            clientNode,
            contacts,
            sentMsgs,
            user,
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }

  public addContact(contact: Contact) {
    if (!this.state.contacts.find(c => c.publicKey === contact.publicKey)) {
      // TODO: perhaps more efficient insert would be better than sort?
      const contacts = [...this.state.contacts, contact].sort((a, b) => {
        if (a.rnsName && !b.rnsName) return a.publicKey < b.publicKey ? -1 : 1;
        else if (!a.rnsName) return -1;
        else if (!b.rnsName) return 1;
        return a.rnsName < b.rnsName ? -1 : 1;
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.setState({ contacts });
    }
  }

  public getContact(rnsName: string) {
    const { contacts } = this.state;
    const contact = contacts.find(c => c.rnsName === rnsName);
    return contact;
  }

  public async processKadMsg(kadMsgObj: any) {
    let { contacts } = this.state;
    let contact = contacts.find(
      c =>
        c.peerInfo &&
        c.peerInfo.id &&
        c.peerInfo.id._idB58String === kadMsgObj.sender,
    );

    if (!contact) {
      contact = await createContactFromID(kadMsgObj.sender);

      contacts = [...contacts, contact].sort((a, b) => {
        if (a.rnsName && !b.rnsName) return a.publicKey < b.publicKey ? -1 : 1;
        else if (!a.rnsName) return -1;
        else if (!b.rnsName) return 1;
        return a.rnsName < b.rnsName ? -1 : 1;
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    const msg = new Message({
      content: kadMsgObj.msg,
      sender: MESSAGE_SENDER.THEM,
    });
    this.addMessage(msg, contact);
    this.setState({ contacts });
  }

  public async addMessage(message: Message, contact: Contact) {
    contact.chat.push(message);
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    this.forceUpdate();
    if (message.sender === MESSAGE_SENDER.ME && contact.peerInfo) {
      await sendMsg(
        this.state.clientNode,
        contact.peerInfo,
        message.content,
        this.state.sentMsgs,
        true,
      );

      this.setState({
        sentMsgs: this.state.sentMsgs + 1,
      });
    }
  }

  private async connectToNode() {
    if (this.state.clientNode) {
      const bootNodeAddr: string = process.env.REACT_APP_BOOTNODE_ADDR
        ? process.env.REACT_APP_BOOTNODE_ADDR
        : '/ip4/127.0.0.1/tcp/57628/ws/ipfs/16Uiu2HAmHvtqJsjkztWXxwrBzCLHEYakmGAH9HJkkJnoKdyrXvNw';
      RifCommunications.connectToNode(this.state.clientNode, bootNodeAddr);
    }
  }

  private async createNode(user: User) {
    if (!this.state.clientNode) {
      try {
        return RifCommunications.createNode(
          user.pi,
          await publicIp.v4(),
          80,
          this.processKadMsg,
        );
      } catch (e) {
        // At least start with localhost if public IP can not be obtained
        return RifCommunications.createNode(
          user.pi,
          '127.0.0.1',
          80,
          this.processKadMsg,
        );
      }
    }
    return this.state.clientNode;
  }

  private async createUser() {
    await this.setupUser(RifCommunications.createKey);
  }

  private async setupUser(
    pidCreatFunc: (keystore) => Promise<PeerId>,
    keystore?,
  ) {
    const { user, node } = await this.createPeer(pidCreatFunc, keystore);
    if (node) {
      this.setState(
        {
          clientNode: node,
          user,
        },
        async () => {
          await this.connectToNode();
          history.push(ROUTES.PROFILE);
        },
      );
    }
  }

  private async createPeer(
    pidCreatFunc: (keystoreJson?) => Promise<PeerId>,
    keystore?,
  ) {
    const keystoreJson =
      keystore || JSON.parse(localStorage.getItem('keystore') || '{}');
    const pid = await pidCreatFunc(keystoreJson);
    const pi = await RifCommunications.createPeerInfo(pid);
    const rnsName = localStorage.getItem('rns');
    const user = new User({ pi, rnsName });
    const node: libp2p | undefined = await this.createNode(user);
    return { user, node };
  }

  private async changeRNS(rnsName: string) {
    const { user } = this.state;
    if (user && user.rnsName !== rnsName) {
      addUserName(rnsName, user.publicKey).then(() => {
        user.rnsName = rnsName;
        localStorage.setItem('rns', rnsName);
        this.setState({ user });
      });
    }
  }

  public clearStorage() {
    this.setState({
      clientNode: undefined,
      contacts: [],
      sentMsgs: 0,
      user: undefined,
    });
    localStorage.clear();
  }

  public exportUser() {
    return JSON.stringify(
      {
        rnsName: localStorage.getItem('rns'),
        keystore: localStorage.getItem('keystore'),
        contacts: this.state.contacts,
      },
      undefined,
      2,
    );
  }
  public async importUser(userJson: IImportJson) {
    localStorage.setItem('rns', userJson.rnsName);
    localStorage.setItem('keystore', userJson.keystore);

    localStorage.setItem('contacts', JSON.stringify(userJson.contacts));
    const { user, node } = await this.createPeer(
      RifCommunications.createPeerIdFromJSON,
      userJson.keystore,
    );
    if (node) {
      this.setState(
        {
          clientNode: node,
          user,
          contacts: userJson.contacts,
        },
        async () => {
          await this.connectToNode();
        },
      );
    }
  }
}

export default { Consumer, Provider: UserProvider };
