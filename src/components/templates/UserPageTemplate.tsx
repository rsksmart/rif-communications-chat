import React, { FC, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import PageTemplate, { PageTemplateProps } from './PageTemplate';
import { ROUTES } from 'routes';
import UserStore from 'store/User/UserStore';

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
    if (!user) {
      history.push(ROUTES.LOGIN);
    }
  }, [user, history]);

  return (
    <>
      <PageTemplate {...props}>{children}</PageTemplate>
    </>
  );
};
