import React from "react";
import { Button, Image, ListGroup } from "react-bootstrap";

import UserProvider from "providers/UserProvider";
import ChatProvider from "providers/ChatProvider";
import ContactModal from "components/ContactModal";
import labitconf from "assets/labitconf.png";

import { ROUTES, history } from "routes";

export default () => (
  <UserProvider.Consumer>
    {({ state: { user }, actions: { createUser } }) => (
      <ChatProvider.Consumer>
        {({ state: { contacts } }) => (
          <div style={{ textAlign: "center" }}>
            {!user && (
              <>
                <Image
                  src={labitconf}
                  style={{
                    maxWidth: 150
                  }}
                />
                <p>
                  Welcome to the RIF Communications laBITconf developers
                  preview.
                </p>
                <Button
                  onClick={async () => {
                    await createUser();
                    history.push(ROUTES.PROFILE);
                  }}
                >
                  Create new identity
                </Button>
              </>
            )}
            {user && (
              <div>
                <ContactModal large />

                {contacts.length > 0 && (
                  <ListGroup
                    variant="flush"
                    style={{ textAlign: "left", marginTop: "1em" }}
                  >
                    {contacts.map(c => (
                      <div key={c.publicKey}>
                        <ListGroup.Item
                          onClick={() => history.push(ROUTES.CHAT(c.publicKey))}
                        >
                          <h5>{c.rnsName ? `${c.rnsName}.rsk` : ""}</h5>
                          <small>
                            {c.chat.length > 0 &&
                              c.chat[c.chat.length - 1].content}
                          </small>
                        </ListGroup.Item>
                      </div>
                    ))}
                  </ListGroup>
                )}
              </div>
            )}
          </div>
        )}
      </ChatProvider.Consumer>
    )}
  </UserProvider.Consumer>
);
