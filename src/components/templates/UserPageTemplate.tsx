import React, { FC, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'

import { ROUTES } from 'routes'
import UserStore from 'store/User/UserStore'
import PageTemplate, { PageTemplateProps } from './PageTemplate'
import { sendSyncRequest } from 'store/User/userUtils'
import { USER_ACTIONS } from 'store/User/userActions'

export interface UserPageTemplateProps extends PageTemplateProps { }

export const UserPageTemplate: FC<UserPageTemplateProps> = ({
  children,
  ...props
}) => {
  const {
    state: { UserState },
    dispatch
  } = useContext(UserStore)
  const history = useHistory()
  const { contacts, clientNode, sentMsgs, isSync, user } = UserState

  useEffect(() => {
    if (!(user && user.rnsName)) {
      history.replace(ROUTES.LOGIN, { backTo: history.location })
    }
  }, [user, history])

  useEffect(() => {
    if (clientNode && isSync) {
      sendSyncRequest(contacts, clientNode, sentMsgs)
        .then(() => {
          dispatch({ type: USER_ACTIONS.START_SYNC, payload: { isSync: false } })
        })
    }
  }, [clientNode, contacts, sentMsgs, isSync, dispatch])

  return (
    <>
      <PageTemplate {...props}>{children}</PageTemplate>
    </>
  )
}
