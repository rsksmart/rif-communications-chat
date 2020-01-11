import React, { useContext, FC } from 'react';

import UserStore from 'store/User/UserStore';
import LoginPageTemplate from 'components/templates/LoginPageTemplate';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const {
    state: {
      UserState: { user },
    },
  } = useContext(UserStore);
  return <LoginPageTemplate user={user} />;
};

export default LoginPage;
