import React, { ReactNode } from 'react';
import { Nav as BSNav } from 'react-bootstrap';

interface NavProps {
  position: 'center' | 'end';
  children: ReactNode;
}

const Nav = (props: NavProps) => (
  <BSNav className={`ml-auto justify-content-${props.position}`}>
    {props.children}
  </BSNav>
);
export default Nav;
