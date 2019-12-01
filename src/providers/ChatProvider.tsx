import React, { Component, createContext } from "react";

import Contact from "models/Contact";

export interface IChatProvider {
  state: {
    contacts: Contact[];
  };
  actions: {
    addContact: (contact: Contact) => void;
  };
}

const { Provider, Consumer } = createContext<IChatProvider>({
  actions: {
    addContact: () => {}
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
  }

  public render() {
    const { contacts } = this.state;
    const { addContact } = this;

    return (
      <Provider
        value={{
          actions: {
            addContact
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
    console.log("does this get even called?");
    const { contacts } = this.state;
    contacts.push(contact);
    this.setState({ contacts });
  }
}

export default { Consumer, Provider: ChatProvider };
