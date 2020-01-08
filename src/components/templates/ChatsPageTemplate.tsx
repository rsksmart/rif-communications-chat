import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { ROUTES } from 'routes';

import ButtonCircleXL from 'components/atoms/buttons/ButtonCircleXL';
import ContactList from 'components/organisms/ContactList';
import AddContactModal from 'components/pages/AddContactModal';
import PageTemplate from './PageTemplate';
import PlusIcon from 'components/atoms/icons/PlusIcon';

const ChatsPageTemplate = ({ contacts, user }) => {
  const [showsNewContact, setShowsNewContact] = useState(false);

  const showNewContactModal = () => setShowsNewContact(true);
  const hideNewContactModal = () => setShowsNewContact(false);

  return (
    <>
      <style type="text/css">
        {`
        .contact-list {
          text-align: left;
          margin-top: 1em;
        }
        `}
      </style>

      {!user ? <Redirect to={ROUTES.LOGIN} /> : null}
      <PageTemplate style={{ textAlign: 'center' }} className="chats">
        <ButtonCircleXL
          className="new-contact-btn"
          variant="primary"
          onClick={showNewContactModal}
        >
          <PlusIcon />
        </ButtonCircleXL>
        <AddContactModal show={showsNewContact} onHide={hideNewContactModal} />
        <ContactList contacts={contacts} className={'contact-list'} />
      </PageTemplate>
    </>
  );
};

export default ChatsPageTemplate;
