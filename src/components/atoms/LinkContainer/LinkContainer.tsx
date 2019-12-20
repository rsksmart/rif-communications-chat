import React, { ReactNode } from 'react';
import { LinkContainer as BSLinkContainer } from 'react-router-bootstrap';

interface LinkContainerProps {
  to: string;
  children: ReactNode;
}

const LinkContainer = (props: LinkContainerProps) => (
  <BSLinkContainer to={props.to}>{props.children}</BSLinkContainer>
);

export default LinkContainer;
