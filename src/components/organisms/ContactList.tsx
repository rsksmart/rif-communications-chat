import React, { FC } from 'react';
import { useHistory } from 'react-router';

import List, { ListProps } from 'components/atoms/List';
import { Contact } from 'models';
import ListItem from 'components/atoms/ListItem';
import { ROUTES } from 'routes';
import SmallText from 'components/atoms/SmallText';
import Heading from 'components/atoms/Heading';

export interface ContactListProps extends ListProps {
  contacts: Contact[];
}

const ContactList: FC<ContactListProps> = ({ contacts, ...rest }) => {
  const history = useHistory();

  return (
    <List {...rest}>
      {!!(contacts && contacts.length) &&
        contacts.map((contact: Contact) => {
          const { rnsName, publicKey, chat } = contact;
          const nChats = chat.length;
          const lastChatContent = !!nChats && chat[nChats - 1].content;

          return (
            <ListItem
              key={publicKey}
              onClick={() => history.push(`/chat/${rnsName}`)}
            >
              <Heading level={5}>{rnsName ? `${rnsName}.rsk` : ''}</Heading>
              <SmallText>{lastChatContent}</SmallText>
            </ListItem>
          );
        })}
    </List>
  );
};

export default ContactList;
