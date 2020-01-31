import React, { FC, useContext } from 'react';
import {
  Navbar as BSNavbar,
  NavbarProps as BSNavbarProps,
} from 'react-bootstrap';

import LinkContainer from 'components/atoms/navigation/LinkContainer';
import Nav from 'components/atoms/navigation/Nav';
import NavBrand from 'components/atoms/navigation/NavBrand';
import NavLink from 'components/atoms/navigation/NavLink';
import { ROUTES } from 'routes';
import UserStore from 'store/User/UserStore';

export interface NavbarProps extends BSNavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const {
    state: {
      UserState: { user },
    },
  } = useContext(UserStore);

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
        {!user && <NavLink text="Profile" style={{ opacity: 0 }} />}
      </Nav>
    </BSNavbar>
  );
};

export default Navbar;
