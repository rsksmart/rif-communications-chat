import React from 'react';
import { Nav as BSNav } from 'react-bootstrap';

interface NavLinkProps {
  text: string;
  hidden?: boolean;
}

const NavLink = (props: NavLinkProps) => (
  <BSNav.Link style={{ opacity: props.hidden ? 0 : 1 }}>
    {props.text}
  </BSNav.Link>
);

export default NavLink;
