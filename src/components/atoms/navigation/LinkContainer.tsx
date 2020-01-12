import React, { FC } from 'react';
import { LinkContainer as BSLinkContainer } from 'react-router-bootstrap';
import { NavLinkProps } from 'react-router-dom';

interface LinkContainerProps extends NavLinkProps {}

const LinkContainer: FC<LinkContainerProps> = ({ children, ...props }) => (
  <BSLinkContainer {...props}>{children}</BSLinkContainer>
);

export default LinkContainer;
