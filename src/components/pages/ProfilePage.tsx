import React, { useContext } from 'react';

import { ProfilePageTemplate } from 'components/templates/ProfilePageTemplate';
import UserStore from 'store/User/UserStore';

export const ProfilePage = () => {
  const {
    state: { UserState },
  } = useContext(UserStore);
  const { user } = UserState;

  // TODO: Extract contacts from user into separate model
  const contacts = user && user.contacts;

  return (
    <>{!!user && <ProfilePageTemplate user={user} contacts={contacts} />}</>
  );
};
