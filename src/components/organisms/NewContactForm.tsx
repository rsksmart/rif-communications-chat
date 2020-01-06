import React, { FC } from 'react';
import {
  InputGroupAppend,
  InputGroupText,
  InputGroup,
  FormControl,
} from 'components/atoms/forms';
import { Field } from 'formik';

export interface NewContactFormProps {
  formik: any;
}
interface FormValues {
  rnsName?: string;
  publicKey?: string;
}

interface FormErrors extends FormValues {}

const NewContactForm: FC<NewContactFormProps> = ({ formik }) => {
  let errors: FormErrors = {};

  const validateName = async rnsName => {
    if (!rnsName) {
      errors.rnsName = 'Required';
    } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
      errors.rnsName =
        'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
    } else {
      //   try {
      //     setIsLoading(true);
      //     const contactPK = await fetchUserByName(rnsName);
      //     setPublicKey(contactPK);
      //   } catch (e) {
      //     errors.rnsName = 'User could not be found.';
      //   } finally {
      //     setIsLoading(false);
      //   }
    }
    return errors;
  };

  return (
    <InputGroup>
      <Field name="rnsName" validate={validateName}>
        <FormControl
          placeholder="Your friend's name"
          aria-label="Your friend's name"
          aria-describedby="basic-addon2"
          // name="rnsName"
          onChange={event => {
            let { value } = event.target;
            event.target.value = value.toLowerCase();
            errors.rnsName = '';
            //   setPublicKey('');
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
      </Field>
      {/* {errors.rnsName && (
        <small style={{ color: 'red' }}>{errors.rnsName}</small>
      )} */}
      {/* {!errors.rnsName && publicKey && (
          <PublicKey publicKey={publicKey} paddingLeft="0em" />
        )} */}
      {/* {isLoading && <small>Fetching user...</small>} */}
    </InputGroup>
  );
};

export default NewContactForm;
