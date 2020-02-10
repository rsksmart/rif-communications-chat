import React, { FC, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import { ROUTES } from 'routes';
import UserStore from 'store/User/UserStore';
import PageTemplate, { PageTemplateProps } from './PageTemplate';

export interface UserPageTemplateProps extends PageTemplateProps {}

export const UserPageTemplate: FC<UserPageTemplateProps> = ({
  children,
  ...props
}) => {
  const {
    state: { UserState },
  } = useContext(UserStore);
  const history = useHistory();

  const { user } = UserState;

  useEffect(() => {
    if (!(user && user.rnsName)) {
      history.replace(ROUTES.LOGIN, { backTo: history.location });
    }
  }, [user, history]);

  return (
    <>
      <PageTemplate {...props}>{children}</PageTemplate>
    </>
  );
};
