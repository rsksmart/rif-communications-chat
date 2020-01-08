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

export interface NewContactModalProps {
  show: boolean;
  onHide: () => void;
}

interface FormValues {
  rnsName?: string;
  publicKey?: string;
}

interface FormErrors extends FormValues {}

const NewContactModal: FC<NewContactModalProps> = ({ show, onHide }) => {
  const userStore = useContext(UserStore);
  const [publicKey, setPublicKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let errors: FormErrors = {};
  const formikProps = {
    initialErrors: {},
    initialValues: {},
    onSubmit: () => {
      debugger;
    },
    validate: async ({ rnsName }: FormValues) => {
      if (!rnsName) {
        errors.rnsName = 'Required';
      } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
        errors.rnsName =
          'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
      } else {
        try {
          setIsLoading(true);
          const contactPK = await fetchUserByName(rnsName);
          setPublicKey(contactPK);
        } catch (e) {
          errors.rnsName = 'User could not be found.';
        } finally {
          setIsLoading(false);
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

  return (
    <ModalFormTemplate {...modalTemplateProps}>
      <InputGroup>
        <FormControl
          placeholder="Your friend's name"
          aria-label="Your friend's name"
          aria-describedby="basic-addon2"
          name="rnsName"
          onChange={event => {
            let { value } = event.target;
            event.target.value = value.toLowerCase();
            errors.rnsName = '';
            setPublicKey('');
            formik.handleChange(event);
          }}
          onBlur={formik.handleBlur}
          defaultValue={formik.values.rnsName}
          autoComplete="off"
          autoFocus
          required
        />
        <InputGroupAppend>
          <InputGroupText id="basic-addon2">.rsk</InputGroupText>
        </InputGroupAppend>
        {errors.rnsName && (
          <small style={{ color: 'red' }}>{errors.rnsName}</small>
        )}
        {/* {!errors.rnsName && publicKey && (
          <PublicKey publicKey={publicKey} paddingLeft="0em" />
        )} */}
        {isLoading && <small>Fetching user...</small>}
      </InputGroup>
    </ModalFormTemplate>
  );
};

export default NewContactModal;
