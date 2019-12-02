import React from "react";
import { Image, ListGroup, Button, Container, Col, Row } from "react-bootstrap";

import Contact from "models/Contact";
import User from "models/User";

import UserProvider from "providers/UserProvider";
import ChatProvider from "providers/ChatProvider";

import ContactDetails from "components/ContactDetails";
import ContactModal from "components/ContactModal";

import lonely from "assets/lonely.png";

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
        <h2 style={{ marginTop: "2em" }}>
          Contacs: <ContactModal />
        </h2>

        {contacts.length > 0 && (
          <ListGroup variant="flush" style={{ textAlign: "left" }}>
            {contacts.map(c => (
              <div
                key={c.publicKey}
                onClick={() => history.push(ROUTES.CHAT(c.publicKey))}
              >
                <ListGroup.Item>
                  <h5>{c.rnsName ? `${c.rnsName}.rsk` : ""}</h5>
                  <small>{c.publicKey}</small>
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        )}
        {contacts.length < 1 && (
          <>
            <Image
              src={lonely}
              style={{
                maxWidth: 150
              }}
            />
            <p>It feels lonely here, let's find some friends!</p>
          </>
        )}
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
