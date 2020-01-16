import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// views
import ChatsPage from 'components/pages/ChatsPage';
import { ROUTES } from 'routes';
import LoginPage from 'components/pages/LoginPage';
import NotFound from 'components/pages/NotFound';
import { ProfilePage } from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';

const LOGGING_ENABLED: boolean =
  !!process.env.REACT_APP_LOGGING && process.env.REACT_APP_LOGGING === 'true';

const Routes = () => {
  const history = useHistory();

  useEffect(() => {
    if (LOGGING_ENABLED) {
      const unlisten = history.listen((location, action) => {
        console.log('TCL: Routes -> location', location);
        console.log('TCL: Routes -> action', action);
      });
      return () => {
        unlisten();
      };
    }
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
