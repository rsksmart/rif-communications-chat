import React from 'react';

import { ListGroup as BSListGroup } from 'react-bootstrap';

export interface ListItemProps {
  key: string;
  onClick: () => void;
  children: React.ReactNode;
}

const ListItem = (props: ListItemProps) => {
  const { key, onClick, children } = props;

  return (
    <BSListGroup.Item key={key} onClick={onClick}>
      {children}
    </BSListGroup.Item>
  );
};

export default ListItem;
