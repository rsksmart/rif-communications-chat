import React from 'react';
import { Button, Image, ListGroup } from 'react-bootstrap';

import UserProvider from 'providers/UserProvider';
import ContactModal from 'components/ContactModal';
import PortModal from 'components/PortModal';
import labitconf from 'assets/labitconf.png';

import { ROUTES, history } from 'routes';

export default () => (
  <UserProvider.Consumer>
    {({ actions: { createUser }, state: { contacts, user } }) => (
      <div style={{ textAlign: 'center' }}>
        {!user && (
          <>
            <Image
              src={labitconf}
              style={{
                maxWidth: 150,
              }}
            />
            <p>
              Welcome to the RIF Communications laBITconf developers preview.
            </p>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={async () => {
                  await createUser();
                  history.push(ROUTES.PROFILE);
                }}
              >
                Create new identity
              </Button>
              <span>or</span>
              <PortModal importOnly />
            </span>
          </>
        )}
        {user && (
          <div>
            <ContactModal large />

            {contacts.length > 0 && (
              <ListGroup
                variant="flush"
                style={{ textAlign: 'left', marginTop: '1em' }}
              >
                {contacts.map(c => (
                  <div
                    key={c.rnsName}
                    onClick={() => history.push(ROUTES.CHAT(c.rnsName))}
                  >
                    <ListGroup.Item>
                      <h5>{c.rnsName ? `${c.rnsName}.rsk` : ''}</h5>
                      <small>
                        {c.chat.length > 0 && c.chat[c.chat.length - 1].content}
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
  </UserProvider.Consumer>
);
