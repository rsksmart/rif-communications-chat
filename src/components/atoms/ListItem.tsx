import React, { FC } from 'react';

import { ListGroup as BSListGroup } from 'react-bootstrap';

export interface ListItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ListItem: FC<ListItemProps> = ({ children, ...rest }) => {
  return <BSListGroup.Item {...rest}>{children}</BSListGroup.Item>;
};

export default ListItem;
