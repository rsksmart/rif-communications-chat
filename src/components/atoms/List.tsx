import React, { FC } from 'react';
import {
  ListGroup as BSListGroup,
  ListGroupProps as BSListGroupProps,
} from 'react-bootstrap';

export interface ListProps extends BSListGroupProps {
  className: string;
}

const List: FC<ListProps> = ({ children, ...rest }) => {
  return <BSListGroup {...rest}>{children}</BSListGroup>;
};

export default List;
