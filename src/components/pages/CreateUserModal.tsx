import React, { FC, useContext } from 'react';
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
import { useFormik } from 'formik';
import { USER_ACTIONS } from 'store/User/userActions';
import { User } from 'models';

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

  const formErrors: FormErrors = {};

  // const { isLoading } = appState;

  const formikProps = {
    initialErrors: {},
    initialValues: {},
    onSubmit: ({ rnsName }: FormValues) => {
      const payload: User = { rnsName, pi: null, publicKey: null };
      dispatch({
        type: USER_ACTIONS.CREATE_USER,
        payload,
      });
    },
    // TODO: this can be DRY-ed more (extract all validations)
    validate: async ({ rnsName }: FormValues) => {
      if (!rnsName) {
        formErrors.rnsName = 'Required';
      } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
        formErrors.rnsName =
          'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
      } else {
        dispatch({
          type: USER_ACTIONS.CHECK_RNS,
          payload: {
            rnsName,
            errorsCb: (rnsExists: boolean) => {
              rnsExists && setErrors({ rnsName: 'Already registered.' });
            },
          },
        });
      }
      return formErrors;
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
    errors,
    setErrors,
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
