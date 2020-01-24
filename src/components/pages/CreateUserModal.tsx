import {
  FormControl,
  InputGroup,
  InputGroupAppend,
  InputGroupText,
} from 'components/atoms/forms';
import { FormInfoBar } from 'components/molecules/FormInfoBar';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import { useFormik } from 'formik';
import { Contact, Message } from 'models';
import React, { FC, useContext } from 'react';
import { APP_ACTIONS } from 'store/App/appActions';
import { checkUserExists, USER_ACTIONS } from 'store/User/userActions';
import { createUser } from 'store/User/userController';
import UserStore from 'store/User/UserStore';

export interface CreateUserModalProps {
  show: boolean;
  onHide: () => void;
}

interface FormValues {
  rnsName?: string;
  publicKey?: string;
}

interface FormErrors extends FormValues {}

const CreateUserModal: FC<CreateUserModalProps> = ({ show, onHide }) => {
  const { dispatch } = useContext(UserStore);

  const formikProps = {
    initialErrors: {},
    initialValues: {},
    onSubmit: async ({ rnsName }: FormValues) => {
      if (rnsName) {
        try {
          const payload = await createUser(
            rnsName,
            (payload: { contact: Contact; message: Message }) => {
              dispatch({
                type: USER_ACTIONS.RECEIVE_MESSAGE,
                payload,
              });
            },
          );
          dispatch({ type: USER_ACTIONS.SET_CLIENT, payload });
          onHide();
        } catch (err) {
          return { type: APP_ACTIONS.SET_ERROR, payload: err };
        }
      }
    },
    validate: async ({ rnsName }: FormValues) => {
      const errors: FormErrors = {};
      if (!rnsName) {
        errors.rnsName = 'Required';
      } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
        errors.rnsName =
          'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
      } else if (await checkUserExists(rnsName)) {
        errors.rnsName = 'Already registered.';
      }
      return errors;
    },
  };

  const formik = useFormik(formikProps);

  const modalTemplateProps: ModalFormTemplateProps = {
    className: 'create-user',
    modalFormProps: {
      formik,
      modalProps: {
        show,
        onHide,
      },
      submitBtnLabel: 'Get',
      title: 'Get your RNS pseudonym now!',
    },
  };

  const {
    handleChange,
    handleBlur,
    values: { rnsName },
    errors,
  } = formik;
  return (
    <ModalFormTemplate {...modalTemplateProps}>
      Writing long-strings is not fun, make it easy for your friends and choose
      your RNS pseudonym. They will be able to chat with you more easily.
      <InputGroup className="mb-3" style={{ marginTop: '1em' }}>
        <FormControl
          placeholder="Your name"
          aria-label="Your name"
          aria-describedby="basic-addon2"
          name="rnsName"
          onChange={event => {
            let { value } = event.target;

            event.target.value = value.toLowerCase();
            handleChange(event);
          }}
          onBlur={handleBlur}
          defaultValue={rnsName}
          autoComplete="off"
          autoFocus
          required
        />
        <InputGroupAppend>
          <InputGroupText id="basic-addon2">.rsk</InputGroupText>
        </InputGroupAppend>
      </InputGroup>
      <FormInfoBar error={errors.rnsName} />
    </ModalFormTemplate>
  );
};

export default CreateUserModal;
