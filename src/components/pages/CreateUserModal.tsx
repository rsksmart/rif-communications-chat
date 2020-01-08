import React, { FC, useContext, useState } from 'react';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import UserStore from 'store/User/UserStore';
import {
  InputGroup,
  FormControl,
  InputGroupAppend,
  InputGroupText,
} from 'components/atoms/forms';
import { fetchUserByName } from 'api/RIFNameService';
import { useFormik } from 'formik';
import AppStore from 'store/App/AppStore';
import { USER_ACTIONS } from 'store/User/userActions';

export interface CreateUserModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
}

interface FormValues {
  rnsName?: string;
  publicKey?: string;
}

interface FormErrors extends FormValues {}

const CreateUserModal = ({ show, onHide, onSubmit }) => {
  const {
    state: { UserState, AppState },
    dispatch,
  } = useContext(UserStore);
  const [publicKey, setPublicKey] = useState('');

  // const { isLoading } = appState;

  let errors: FormErrors = {};
  const formikProps = {
    initialErrors: {},
    initialValues: {},
    onSubmit: e => {
      debugger;
      onSubmit(e);
      onHide();
    },
    // TODO: this can be DRY-ed more (extract all validations)
    validate: async ({ rnsName }: FormValues) => {
      if (!rnsName) {
        errors.rnsName = 'Required';
      } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
        errors.rnsName =
          'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
      } else {
        dispatch(USER_ACTIONS.CHECK_RNS);
      }
      return errors;
    },
  };

  const formik = useFormik(formikProps);

  const modalTemplateProps: ModalFormTemplateProps = {
    className: 'create-user',
    modalFormProps: {
      formik,
      //TODO: prop-drilling here. use context?
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
        {/* TODO: this can be DRY-ed more (see other modal pages)  */}
        <InputGroupAppend>
          <InputGroupText id="basic-addon2">.rsk</InputGroupText>
        </InputGroupAppend>
        {errors.rnsName && (
          <small style={{ color: 'red' }}>{errors.rnsName}</small>
        )}
        {/* {isLoading && <small>Waiting for server...</small>} */}
      </InputGroup>
    </ModalFormTemplate>
  );
};

export default CreateUserModal;
