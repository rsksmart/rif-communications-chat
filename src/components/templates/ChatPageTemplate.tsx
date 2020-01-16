import React, { FC } from 'react';
import Heading from 'components/atoms/Heading';
import { Contact } from 'models';

export interface ChatPageTemplateProps {
  contact: Contact;
}

const ChatPageTemplate: FC<ChatPageTemplateProps> = ({ contact }) => {
  return (
    <>
      <Heading level={5} style={{ paddingLeft: '8px', paddingRight: '8px' }}>
        {contact}
      </Heading>
    </>
  );
};

export default ChatPageTemplate;
