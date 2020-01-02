import React, { useContext, FC } from 'react';

import UserStore from 'store/User/UserStore';
import ChatsPageTemplate from 'components/templates/ChatsPageTemplate';

export interface ChatsPageProps {}

const ChatsPage: FC<ChatsPageProps> = () => {
  const { state } = useContext(UserStore);
  const { user, contacts } = state;

  return <ChatsPageTemplate contacts={contacts} user={user} />;
};

export default ChatsPage;
