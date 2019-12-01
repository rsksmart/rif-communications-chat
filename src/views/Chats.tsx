import React from "react";
import { Button } from "react-bootstrap";

import UserProvider from "providers/UserProvider";
import ContactModal from "components/ContactModal";

import { ROUTES, history } from "routes";

export default () => (
  <UserProvider.Consumer>
    {({ state: { user }, actions: { createUser } }) => (
      <div style={{ textAlign: "center" }}>
        {!user && (
          <>
            <p>
              Welcome to the RIF Communications laBITconf developers preview.
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
        {user && <ContactModal />}
      </div>
    )}
  </UserProvider.Consumer>
);
