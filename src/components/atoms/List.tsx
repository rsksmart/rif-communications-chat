import React from 'react';
import { ListGroup as BSListGroup } from 'react-bootstrap';

const List = (children, ...props) => {
  return <BSListGroup {...props}>{children}</BSListGroup>;
};

export default List;
