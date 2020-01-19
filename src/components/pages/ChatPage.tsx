import ChatPageTemplate from 'components/templates/ChatPageTemplate';
import { Contact } from 'models';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserStore from 'store/User/UserStore';
import Logger from 'utils/Logger';

const logger = Logger.getInstance();

const ChatPage = () => {
  const { rnsName } = useParams();

  const {
    state: { UserState },
  } = useContext(UserStore);
  const contacts = UserState.contacts;
  const contact = contacts.find((c: Contact) => {
    return c.rnsName === rnsName;
  });

  return <ChatPageTemplate contact={contact} className="chats" />;
};

export default ChatPage;
