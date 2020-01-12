import React, { FC, useContext } from 'react';
import {
  Navbar as BSNavbar,
  NavbarProps as BSNavbarProps,
} from 'react-bootstrap';

import Nav from 'components/atoms/navigation/Nav';
import LinkContainer from 'components/atoms/navigation/LinkContainer';
import NavLink from 'components/atoms/navigation/NavLink';
import NavBrand from 'components/atoms/navigation/NavBrand';
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
        {
          //FIXME: adding a hidden navlink just to fill space does not feel like the best practice solution
        }
        {!user && <NavLink text="Profile" style={{ opacity: 0 }} />}
      </Nav>
    </BSNavbar>
  );
};

export default Navbar;
