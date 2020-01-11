import React, { useState } from 'react';

import ButtonCircleXL from 'components/atoms/buttons/ButtonCircleXL';
import ContactList from 'components/organisms/ContactList';
import AddContactModal from 'components/pages/AddContactModal';
import PlusIcon from 'components/atoms/icons/PlusIcon';
import { UserPageTemplate } from './UserPageTemplate';

const ChatsPageTemplate = ({ contacts }) => {
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
      <UserPageTemplate style={{ textAlign: 'center' }} className="chats">
        <ButtonCircleXL
          className="new-contact-btn"
          variant="primary"
          onClick={showNewContactModal}
        >
          <PlusIcon />
        </ButtonCircleXL>
        <AddContactModal show={showsNewContact} onHide={hideNewContactModal} />
        <ContactList contacts={contacts} className={'contact-list'} />
      </UserPageTemplate>
    </>
  );
};

export default ChatsPageTemplate;
