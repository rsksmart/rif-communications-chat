import ButtonCircle from 'components/atoms/buttons/ButtonCircle';
import { Form, FormControl } from 'components/atoms/forms';
import Heading from 'components/atoms/Heading';
import PaperPlaneIcon from 'components/atoms/icons/PaperPlaneIcon';
import ChatDisplay from 'components/organisms/ChatDisplay';
import { useFormik } from 'formik';
import { Contact, Message } from 'models';
import React, { FC, useContext } from 'react';
import { USER_ACTIONS } from 'store/User/userActions';
import UserStore from 'store/User/UserStore';
import { UserPageTemplate, UserPageTemplateProps } from './UserPageTemplate';

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
  const { dispatch } = useContext(UserStore);

  const formikProps = {
    initialValues: {
      content: '',
    },
    initialErrors: {},
    onSubmit: ({ content }: FormValues, actions) => {
      !!content &&
        dispatch({
          type: USER_ACTIONS.SEND_MESSAGE,
          payload: {
            contact,
            message: new Message({ content, timestamp: Date.now() }),
          },
        });
      actions.resetForm();
    },
  };

  const formik = useFormik(formikProps);

  const {
    submitForm,
    handleChange,
    handleBlur,
    values: { content },
  } = formik;

  const rnsName = !!contact && contact.rnsName;
  const publicKey = !!contact && contact.publicKey;
  const chat = !!contact && contact.chat;

  // TODO: Extract all forms into a reusable component
  return (
    <UserPageTemplate {...rest}>
      <Heading level={5} style={{ paddingLeft: '8px', paddingRight: '8px' }}>
        {rnsName ? `${rnsName}.rsk` : publicKey}
      </Heading>
      {!!chat && <ChatDisplay chat={chat} />}
      <hr />
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
        <Form>
          {/* FIXME: Disable automatic url append on enter (for the bellow input field)  */}
          <FormControl
            placeholder="Your message here"
            aria-label="Your message here"
            aria-describedby="basic-addon2"
            name="content"
            onChange={handleChange}
            onBlur={handleBlur}
            value={content}
            autoComplete="off"
            autoFocus
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
