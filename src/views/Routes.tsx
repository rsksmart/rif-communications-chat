import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from 'routes';

// views
import Chat from 'views/Chat';
import Chats from 'views/Chats';
import Profile from 'views/Profile';
import Example from 'views/Example';
import NotFound from 'views/NotFound';
import Clear from 'views/Clear';

export default () => (
  <Switch>
    <Route exact path={ROUTES.CHATS} component={Chats} />
    <Route exact path={ROUTES.EXAMPLE} component={Example} />
    <Route exact path={ROUTES.PROFILE} component={Profile} />
    <Route path={ROUTES.CHAT()} component={Chat} />
    <Route path={ROUTES.CLEAR} component={Clear} />

    <Route component={NotFound} />
  </Switch>
);
