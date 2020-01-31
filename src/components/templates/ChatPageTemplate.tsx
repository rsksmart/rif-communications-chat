import ButtonCircle from 'components/atoms/buttons/ButtonCircle';
import { Form, FormControl } from 'components/atoms/forms';
import Heading from 'components/atoms/Heading';
import PaperPlaneIcon from 'components/atoms/icons/PaperPlaneIcon';
import ChatDisplay from 'components/organisms/ChatDisplay';
import { useFormik } from 'formik';
import { Contact, Message } from 'models';
import React, { FC, useContext } from 'react';
import { sendMsg } from 'rif-communications';
import { USER_ACTIONS } from 'store/User/userActions';
import { connectToKdmNode } from 'store/User/userController';
import UserStore from 'store/User/UserStore';
import Logger from 'utils/Logger';
import { UserPageTemplate, UserPageTemplateProps } from './UserPageTemplate';

const logger = Logger.getInstance();

export interface ChatPageTemplateProps extends UserPageTemplateProps {
  contact: Contact;
}

interface FormValues {
  content?: string;
}

const ChatPageTemplate: FC<ChatPageTemplateProps> = ({
  contact,
  children,
  ...rest
}) => {
  const {
    state: {
      UserState: { clientNode, sentMsgs },
    },
    dispatch,
  } = useContext(UserStore);

  const formikProps = {
    initialValues: {
      content: '',
    },
    initialErrors: {},
    onSubmit: async ({ content }: FormValues, actions) => {
      if (content) {
        const { peerInfo } = contact;
        try {
          await sendMsg(clientNode, peerInfo, content, sentMsgs, true);

          dispatch({
            type: USER_ACTIONS.SEND_MESSAGE,
            payload: {
              contact,
              message: new Message({
                content,
                timestamp: Date.now(),
              }),
            },
          });
          actions.resetForm();
        } catch (err) {
          logger.error(
            'Unable to dial contact, try to reconnect to bootnode:',
            err,
          );
          // Option number 1, try to reconnect if sending fails
          connectToKdmNode(clientNode).catch(connErr => {
            logger.error('Unable to reconnect to node');
          });
        }
      }
    },
  };

  const formik = useFormik(formikProps);

  const {
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
    values: { content },
  } = formik;

  const rnsName = !!contact && contact.rnsName;
  const publicKey = !!contact && contact.publicKey;
  const chat = !!contact && contact.chat;

  return (
    <UserPageTemplate {...rest}>
      <Heading level={5} style={{ paddingLeft: '8px', paddingRight: '8px' }}>
        {rnsName ? `${rnsName}.rsk` : publicKey}
      </Heading>
      {!!chat && <ChatDisplay chat={chat} />}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          backgroundColor: '#EEE',
          padding: '8px',
          paddingRight: '40px',
          width: '100%',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <FormControl
            placeholder="Your message goes here"
            aria-label="Your message goes here"
            aria-describedby="basic-addon2"
            name="content"
            onChange={handleChange}
            onBlur={handleBlur}
            value={content}
            autoComplete="off"
            autoFocus={true}
            style={{ width: '100%' }}
          />
          <ButtonCircle
            type="button"
            onClick={submitForm}
            disabled={!content}
            style={{
              position: 'fixed',
              bottom: '10px',
              right: '.5em',
            }}
          >
            <PaperPlaneIcon />
          </ButtonCircle>
        </Form>
      </div>
    </UserPageTemplate>
  );
};

export default ChatPageTemplate;
