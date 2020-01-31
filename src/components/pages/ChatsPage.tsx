import React, { FC, useContext } from 'react';

import ChatsPageTemplate from 'components/templates/ChatsPageTemplate';
import UserStore from 'store/User/UserStore';

export interface ChatsPageProps {}

const ChatsPage: FC<ChatsPageProps> = () => {
  const {
    state: { UserState },
  } = useContext(UserStore);
  const { contacts } = UserState;

  return <ChatsPageTemplate contacts={contacts} />;
};

export default ChatsPage;
