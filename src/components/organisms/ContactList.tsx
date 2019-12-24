import React from 'react';
import { useHistory } from 'react-router';

import List from 'components/atoms/List';
import { Contact } from 'models';
import ListItem from 'components/atoms/ListItem';
import { ROUTES } from 'routes';

interface ContactListProps {
  contacts: Contact[];
}

const ContactList = (props: ContactListProps) => {
  const { contacts } = props;
  const history = useHistory();

  return (
    <List>
      {contacts.map((contact: Contact) => {
        const { rnsName, publicKey, chat } = contact;
        const nChats = chat.length;

        return (
          <ListItem
            key={publicKey}
            onClick={() => history.push(ROUTES.CHAT(rnsName))}
          >
            <h5>{rnsName ? `${rnsName}.rsk` : ''}</h5>
            <small>{nChats && chat[nChats - 1].content}</small>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ContactList;
