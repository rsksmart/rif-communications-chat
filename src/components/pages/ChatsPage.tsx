import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserStore from 'store/User/UserStore';
import PageTemplate from 'components/templates/PageTemplate';
import { ROUTES } from 'routes';
import ContactList from 'components/organisms/ContactList';

interface ChatsPageProps {}

const ChatsPage = (props: ChatsPageProps) => {
  const { state } = useContext(UserStore);
  const { user, contacts } = state;

  return (
    <>
      {!user ? <Redirect to={ROUTES.LOGIN} /> : null}
      <PageTemplate className="chats" style={{ textAlign: 'center' }}>
        {contacts.length && <ContactList contacts={contacts} />}
      </PageTemplate>
    </>
  );
};

export default ChatsPage;
