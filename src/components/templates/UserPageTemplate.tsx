import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router';

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
  const { user } = UserState;

  return (
    <>
      {!user ? <Redirect to={ROUTES.LOGIN} /> : null}
      <PageTemplate {...props}>{children}</PageTemplate>
    </>
  );
};
