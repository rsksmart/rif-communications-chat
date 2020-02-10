import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

// views
import ChatsPage from 'components/pages/ChatsPage'
import LoginPage from 'components/pages/LoginPage'
import NotFound from 'components/pages/NotFound'
import { ROUTES } from 'routes'
import Logger from 'utils/Logger'
import ChatPage from './pages/ChatPage'
import { ProfilePage } from './pages/ProfilePage'

const logger = Logger.getInstance()

const Routes = () => {
  const history = useHistory()

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      logger.debug('Routes -> location', location)
      logger.debug('Routes -> action', action)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return (
    <Switch>
      <Route exact={true} path={ROUTES.CHATS} component={ChatsPage} />
      <Route exact={true} path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.CHAT} component={ChatPage} />
      <Route exact={true} path={ROUTES.PROFILE} component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
