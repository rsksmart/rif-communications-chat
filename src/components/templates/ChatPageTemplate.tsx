import ButtonCircle from 'components/atoms/buttons/ButtonCircle';
import Heading from 'components/atoms/Heading';
import PaperPlaneIcon from 'components/atoms/icons/PaperPlaneIcon';
import ChatDisplay from 'components/organisms/ChatDisplay';
import { useFormik } from 'formik';
import { Contact } from 'models';
import React, { FC } from 'react';
import { Form, FormControl } from 'react-bootstrap';
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
  const formikProps = {
    initialValues: {
      content: '',
    },
    initialErrors: {},
    onSubmit: ({ content }: FormValues, actions) => {
      // addMessage(new Message({ content }), contact);
      // actions.resetForm();
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
          <FormControl
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
