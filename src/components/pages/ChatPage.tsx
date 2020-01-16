import React from 'react';
import { Contact } from 'models';
import { Form, FormControl } from 'components/atoms/forms';
import ButtonCircle from 'components/atoms/buttons/ButtonCircle';
import PaperPlaneIcon from 'components/atoms/icons/PaperPlaneIcon';
import { useFormik } from 'formik';
import ChatDisplay from 'components/organisms/ChatDisplay';

export interface ChatPageProps {
  contact: Contact;
}

interface FormValues {
  content?: string;
}
const ChatPage = ({ contact }: ChatPageProps) => {
  const formikProps = {
    initialValues: {},
    initialErrors: {},
    onSubmit: ({ content }: FormValues, actions) => {
      //   addMessage(new Message({ content }), contact);
      //   actions.resetForm();
    },
  };

  const formik = useFormik(formikProps);

  const {
    submitForm,
    handleChange,
    handleBlur,
    values: { content },
  } = formik;
  return (
    <>
      <div>
        {contact.rnsName ? `${contact.rnsName}.rsk` : contact.publicKey}
      </div>
      <hr />
      <ChatDisplay chat={contact.chat} />

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
            type="submit"
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
    </>
  );
};

export default ChatPage;
