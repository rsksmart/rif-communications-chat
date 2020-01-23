import LoginPageTemplate from 'components/templates/LoginPageTemplate';
import React, { FC, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import UserStore from 'store/User/UserStore';
import { recoverUser } from 'store/User/userUtils';
import LocalStorage from 'utils/LocalStorage';

// import Logger from 'utils/Logger';

export interface LoginPageProps {}

const persistence = LocalStorage.getInstance();

const LoginPage: FC<LoginPageProps> = () => {
  const { state, dispatch } = useContext(UserStore);
  const {
    UserState: { user },
    AppState: { isLoading },
  } = state;

  const history = useHistory();

  useEffect(() => {
    const keystore = persistence.getItem('keystore');
    const rnsName = user && user.rnsName;

    if (!isLoading && !rnsName && keystore) {
      const contacts = persistence.getItem('contacts');
      recoverUser({ keystore, contacts }, dispatch);
    }
    if (rnsName && keystore) {
      history.replace(history.location.state.backTo);
    }
  }, [isLoading, user, dispatch, history]);

  return <LoginPageTemplate user={user} />;
};

export default LoginPage;
