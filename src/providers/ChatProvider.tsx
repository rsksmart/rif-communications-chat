import React, { Component, createContext } from "react";

import Contact, { IContactParams } from "models/Contact";
import Message from "models/Message";

export interface IChatProvider {
  state: {
    contacts: Contact[];
  };
  actions: {
    addContact: (contact: Contact) => void;
    getContact: (pubKey: string) => Contact | undefined;
    addMessage: (message: Message, contact: Contact) => void;
  };
}

const { Provider, Consumer } = createContext<IChatProvider>({
  actions: {
    addContact: () => {},
    getContact: () => undefined,
    addMessage: () => {}
  },
  state: {
    contacts: []
  }
});

interface IChatProviderProps {}
interface IChatProviderState {
  contacts: Contact[];
}

class ChatProvider extends Component<IChatProviderProps, IChatProviderState> {
  constructor(props: object) {
    super(props);

    this.state = {
      contacts: []
    };

    this.addContact = this.addContact.bind(this);
    this.getContact = this.getContact.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    const ls = JSON.parse(localStorage.getItem("contacts") || "[]");
    this.setState({ contacts: ls.map((c: IContactParams) => new Contact(c)) });
  }

  public render() {
    const { contacts } = this.state;
    const { addContact, getContact, addMessage } = this;

    return (
      <Provider
        value={{
          actions: {
            addContact,
            getContact,
            addMessage
          },
          state: {
            contacts
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }

  public addContact(contact: Contact) {
    const contacts = [...this.state.contacts, contact].sort((a, b) => {
      if (a.rnsName && !b.rnsName) return a.publicKey < b.publicKey ? -1 : 1;
      else if (!a.rnsName) return -1;
      else if (!b.rnsName) return 1;
      return a.rnsName < b.rnsName ? -1 : 1;
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    this.setState({ contacts });
  }

  public getContact(pubKey: string) {
    const { contacts } = this.state;
    const contact = contacts.find(c => c.publicKey === pubKey);
    return contact;
  }

  public addMessage(message: Message, contact: Contact) {
    contact.chat.push(message);
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    this.forceUpdate();
  }
}

export default { Consumer, Provider: ChatProvider };
