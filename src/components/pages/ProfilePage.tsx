import React, { useContext } from 'react';

import { ProfilePageTemplate } from 'components/templates/ProfilePageTemplate';
import UserStore from 'store/User/UserStore';

export const ProfilePage = () => {
  const {
    state: { UserState },
  } = useContext(UserStore);
  const { contacts, user } = UserState;

  return <ProfilePageTemplate user={user} contacts={contacts} />;
};
