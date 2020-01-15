import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// views
// import Chat from 'views/Chat';
import ChatsPage from 'components/pages/ChatsPage';
import { ROUTES } from 'routes';
import LoginPage from 'components/pages/LoginPage';
// import Profile from 'views/Profile';
// import Example from 'views/Example';
import NotFound from 'components/pages/NotFound';
import { ProfilePage } from './pages/ProfilePage';
// import Clear from 'views/Clear';

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
      {/* <Route exact path={ROUTES.EXAMPLE} component={Example} />
        <Route path={ROUTES.CHAT()} component={Chat} />
        <Route path={ROUTES.CLEAR} component={Clear} />
        */}
      <Route exact path={ROUTES.PROFILE} component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
