import { fetchUserByName } from 'api/RIFNameService';
import {
  FormControl,
  InputGroup,
  InputGroupAppend,
  InputGroupText,
} from 'components/atoms/forms';
import { FormInfoBar } from 'components/molecules/FormInfoBar';
import PublicKey from 'components/molecules/PublicKey';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import { useFormik } from 'formik';
import { Contact } from 'models';
import React, { FC, useContext, useState } from 'react';
import { USER_ACTIONS } from 'store/User/userActions';
import UserStore from 'store/User/UserStore';
import Logger from 'utils/Logger';

const logger = Logger.getInstance();

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

  const formikProps = {
    initialErrors: {},
    initialValues: {},
    onSubmit: async ({ rnsName }: FormValues, actions) => {
      const contact = await Contact.new({
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
      const errors: FormErrors = {};
      if (!rnsName) {
        errors.rnsName = 'Required';
      } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
        errors.rnsName =
          'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
      } else {
        try {
          const publicKey = await fetchUserByName(rnsName);
          if (publicKey) {
            setContactKey(publicKey);
          } else {
            errors.rnsName = 'User does not exist.';
          }
        } catch (err) {
          const msg = (errors.rnsName = 'Could not fetch contact:');
          logger.debug(msg, err);
        }
      }
      return errors;
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
