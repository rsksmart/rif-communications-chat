import React from 'react';
import { Route, Switch } from 'react-router-dom';

// views
// import Chat from 'views/Chat';
import ChatsPage from 'components/pages/ChatsPage';
import { ROUTES } from 'routes';
import LoginPage from 'components/pages/LoginPage';
// import Profile from 'views/Profile';
// import Example from 'views/Example';
import NotFound from 'components/pages/NotFound';
// import Clear from 'views/Clear';

const Routes = () => (
  <Switch>
    <Route exact path={ROUTES.CHATS} component={ChatsPage} />
    <Route exact path={ROUTES.LOGIN} component={LoginPage} />
    {/* <Route exact path={ROUTES.EXAMPLE} component={Example} />
    <Route exact path={ROUTES.PROFILE} component={Profile} />
    <Route path={ROUTES.CHAT()} component={Chat} />
    <Route path={ROUTES.CLEAR} component={Clear} />
 */}
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
