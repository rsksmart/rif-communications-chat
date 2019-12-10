import React, { useEffect } from 'react';

import UserProvider from '../providers/UserProvider';
import { ROUTES, history } from '../routes';

export default () => (
  <UserProvider.Consumer>
    {({ actions: { clearStorage } }) => {
      clearStorage();
      history.push(ROUTES.CHATS);
      return null;
    }}
  </UserProvider.Consumer>
);
