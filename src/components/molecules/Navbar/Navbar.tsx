import React, { useContext } from 'react';
import { Navbar as BSNavbar } from 'react-bootstrap';

import Nav from 'components/atoms/Nav';
import LinkContainer from 'components/atoms/LinkContainer';
import NavLink from 'components/atoms/NavLink';
import NavBrand from 'components/atoms/NavBrand';
import { ROUTES } from 'routes';
import UserStore from 'components/atoms/User/UserStore';

const Navbar = () => {
  const { state } = useContext(UserStore);
  const { user } = state;

  return (
    <BSNavbar variant="dark" bg="dark" expand="lg" sticky="top">
      <LinkContainer to={ROUTES.CHATS}>
        <NavLink text="Chats" />
      </LinkContainer>
      <Nav position="center">
        <LinkContainer to={ROUTES.CHATS}>
          <NavBrand />
        </LinkContainer>
      </Nav>
      <Nav position="end">
        {user && (
          <LinkContainer to={ROUTES.PROFILE}>
            <NavLink text="Profile" />
          </LinkContainer>
        )}
        {!user && <NavLink text="Profile" hidden={true} />}
      </Nav>
    </BSNavbar>
  );
};

export default Navbar;
