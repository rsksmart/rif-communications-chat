import React, { FC, useState, useContext } from 'react';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import {
  InputGroup,
  FormControl,
  InputGroupAppend,
  InputGroupText,
} from 'components/atoms/forms';
import { useFormik } from 'formik';
import UserStore from 'store/User/UserStore';
import { USER_ACTIONS } from 'store/User/userActions';
import PublicKey from 'components/molecules/PublicKey';
import { Contact } from 'models';
import { useHistory } from 'react-router';
import { ROUTES } from 'routes';
import { FormInfoBar } from 'components/molecules/FormInfoBar';

export interface NewContactModalProps {
  show: boolean;
  onHide: () => void;
}

interface FormValues {
  rnsName?: string;
  publicKey?: string;
}

interface FormErrors extends FormValues {}

const AddContactModal: FC<NewContactModalProps> = ({ show, onHide }) => {
  const { dispatch } = useContext(UserStore);
  const [contactKey, setContactKey] = useState('');
  const history = useHistory();

  let formErrors: FormErrors = {};
  const formikProps = {
    initialErrors: {},
    initialValues: {},
    onSubmit: ({ rnsName }: FormValues, actions) => {
      const contact = new Contact({
        rnsName,
        publicKey: contactKey,
        multiaddr: '',
      });
      dispatch({
        type: USER_ACTIONS.ADD_CONTACT,
        payload: { contact },
      });
      actions.resetForm();
      actions.setErrors({});
      onHide();
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
          type: USER_ACTIONS.FETCH_RNS,
          payload: {
            rnsName,
            setPublicKey: (publicKey: string | undefined) => {
              publicKey && setContactKey(publicKey);
              !publicKey && setErrors({ rnsName: 'User does not exist.' });
            },
          },
        });
      }
      return formErrors;
    },
  };

  const formik = useFormik(formikProps);

  const modalTemplateProps: ModalFormTemplateProps = {
    className: 'new-contact',
    modalFormProps: {
      formik,
      //TODO: prop-drilling here. use context?
      modalProps: {
        show,
        onHide,
      },
      submitBtnLabel: 'Add contact',
      title: 'Create new Contact',
    },
  };

  const {
    handleChange,
    setErrors,
    handleBlur,
    values: { rnsName },
    errors,
  } = formik;
  return (
    <ModalFormTemplate {...modalTemplateProps}>
      <InputGroup className="mb-3" style={{ marginTop: '1em' }}>
        <FormControl
          placeholder="Your friend's name"
          aria-label="Your friend's name"
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
      </InputGroup>
      <FormInfoBar error={errors.rnsName}>
        {!errors.rnsName && contactKey && (
          <PublicKey publicKey={contactKey} style={{ paddingLeft: '0em' }} />
        )}
      </FormInfoBar>
    </ModalFormTemplate>
  );
};

export default AddContactModal;
