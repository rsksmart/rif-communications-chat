import React, { FC } from 'react';
import BSNavLink, {
  NavLinkProps as BSNavLinkProps,
} from 'react-bootstrap/NavLink';

interface NavLinkProps extends BSNavLinkProps {
  text: string;
  style?: Object;
}

const NavLink: FC<NavLinkProps> = ({ text, ...rest }) => (
  <BSNavLink {...rest}>{text}</BSNavLink>
);

export default NavLink;
