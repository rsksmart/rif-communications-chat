import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

import LogoNavbar from "rifui/LogoNavbar";
import UserProvider from "providers/UserProvider";

import { ROUTES } from "routes";

export default () => (
  <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
    <LinkContainer to={ROUTES.CHATS}>
      <Navbar.Brand>{"< Chats"}</Navbar.Brand>
    </LinkContainer>
    <Nav className="ml-auto justify-content-center">
      <LinkContainer to={ROUTES.CHATS}>
        <Navbar.Brand>
          <LogoNavbar />
        </Navbar.Brand>
      </LinkContainer>
    </Nav>
    <UserProvider.Consumer>
      {({ state: { user } }) => (
        <Nav className="ml-auto justify-content-end">
          {user && (
            <LinkContainer to={ROUTES.PROFILE}>
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      )}
    </UserProvider.Consumer>
  </Navbar>
);
