import LoginPageTemplate from 'components/templates/LoginPageTemplate'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { ROUTES } from 'routes'
import UserStore from 'store/User/UserStore'
import { recoverUser } from 'store/User/userUtils'
import LocalStorage from 'utils/LocalStorage'

export interface LoginPageProps { }

const persistence = LocalStorage.getInstance()

const LoginPage: FC<LoginPageProps> = () => {
  const { state, dispatch } = useContext(UserStore)
  const {
    UserState: { user },
  } = state

  const [isRecovering, setIsRecovering] = useState(false)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const keystore = persistence.getItem('keystore')
    const rnsName = user && user.rnsName

    if (!isRecovering && !rnsName && keystore) {
      (async () => {
        setIsRecovering(true)
        const contacts = persistence.getItem('contacts')
        await recoverUser({ keystore, contacts }, dispatch, () => {
          setIsRecovering(false)
        })
      })()
    }
  }, [isRecovering, user, dispatch])

  useEffect(() => {
    const keystore = persistence.getItem('keystore')
    const rnsName = user && user.rnsName

    if (!isRecovering && rnsName && keystore) {
      const backTo = location.state && (location.state as { backTo: string }).backTo
      history.replace(backTo || ROUTES.PROFILE)
    }
  }, [history, location, user, isRecovering])

  return <LoginPageTemplate isRecovering={isRecovering} />
}

export default LoginPage
