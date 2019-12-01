import React from "react";

import Contact from "models/Contact";
import User from "models/User";

import UserProvider from "providers/UserProvider";
import ChatProvider from "providers/ChatProvider";

import ContactDetails from "components/ContactDetails";
import ContactModal from "components/ContactModal";

import { ROUTES, history } from "routes";

interface IProfileProps {
  user?: User;
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  changeRNS: (rnsName: string) => void;
}

class Profile extends React.Component<IProfileProps> {
  public componentDidMount() {
    if (!this.props.user) history.push(ROUTES.CHATS);
  }
  render() {
    const { user, contacts, addContact, changeRNS } = this.props;

    // This should never happen as we are intercepting in the componentDidMount,
    // but typescript does not like not having check here
    if (!user) {
      history.push(ROUTES.CHATS);
      return null;
    }

    return (
      <div style={{ textAlign: "center" }}>
        <ContactDetails user={user} changeRNS={changeRNS} />
        <h3>Contacs:</h3>

        <ContactModal />
        {contacts.map(c => (
          <p>
            {c.rnsName}, {c.publicKey}
          </p>
        ))}
      </div>
    );
  }
}

export default () => (
  <UserProvider.Consumer>
    {({ state: { user }, actions: { changeRNS } }) => (
      <ChatProvider.Consumer>
        {({ state: { contacts }, actions: { addContact } }) => (
          <>
            <Profile
              user={user}
              contacts={contacts}
              addContact={addContact}
              changeRNS={changeRNS}
            />
          </>
        )}
      </ChatProvider.Consumer>
    )}
  </UserProvider.Consumer>
);
