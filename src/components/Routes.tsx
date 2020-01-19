import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// views
import ChatsPage from 'components/pages/ChatsPage';
import { ROUTES } from 'routes';
import LoginPage from 'components/pages/LoginPage';
import NotFound from 'components/pages/NotFound';
import { ProfilePage } from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import Logger from 'utils/Logger';

const logger = Logger.getInstance();

const Routes = () => {
  const history = useHistory();

  useEffect(() => {
      const unlisten = history.listen((location, action) => {
      logger.debug('Routes -> location', location);
      logger.debug('Routes -> action', action);
      });
      return () => {
        unlisten();
      };
  }, [history]);

  return (
    <Switch>
      <Route exact path={ROUTES.CHATS} component={ChatsPage} />
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.CHAT()} component={ChatPage} />
      {/* <Route exact path={ROUTES.EXAMPLE} component={Example} />
        <Route path={ROUTES.CLEAR} component={Clear} />
        */}
      <Route exact path={ROUTES.PROFILE} component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
