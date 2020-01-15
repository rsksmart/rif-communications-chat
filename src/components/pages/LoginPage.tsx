import React, { useContext, FC, useEffect } from 'react';

import UserStore from 'store/User/UserStore';
import LoginPageTemplate from 'components/templates/LoginPageTemplate';
import { USER_ACTIONS } from 'store/User/userActions';
import LocalStorage from 'api/LocalStorage';

export interface LoginPageProps {}

const localStorage = LocalStorage.getInstance();

const LoginPage: FC<LoginPageProps> = () => {
  const {
    state: {
      UserState: { user },
    },
    dispatch,
  } = useContext(UserStore);

  useEffect(() => {
    const keystore = localStorage.getItem('keystore');
    const rnsName = user && user.rnsName;

    if (!rnsName && keystore) {
      dispatch({
        type: USER_ACTIONS.SETUP_USER,
        payload: {
          keystore,
        },
      });
    }
  }, [user, dispatch]);

  return <LoginPageTemplate user={user} />;
};

export default LoginPage;
