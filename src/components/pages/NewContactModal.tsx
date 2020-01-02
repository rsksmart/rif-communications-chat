import React, { FC } from 'react';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import { InputGroup, FormControl } from 'components/atoms/forms';

export interface NewContactModalProps {
  show: boolean;
  onHide: () => void;
}

const NewContactModal: FC<NewContactModalProps> = ({ show, onHide }) => {
  const modalTemplateProps: ModalFormTemplateProps = {
    className: 'new-contact',
    modalFormProps: {
      formikProps: {
        initialErrors: {},
        initialValues: {},
        onSubmit: () => {},
        validate: () => {},
        // async ({ rnsName }: FormValues) => {
        //       let errors: FormErrors = {};
        //       if (!rnsName) {
        //         errors.rnsName = 'Required';
        //       } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
        //         errors.rnsName =
        //           'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
        //       } else {
        //         try {
        //           setIsLoading(true);
        //           const contactPK = await fetchUserByName(rnsName);
        //           setPublicKey(contactPK);
        //         } catch (e) {
        //           errors.rnsName = 'User does not exist.';
        //         } finally {
        //           setIsLoading(false);
        //         }
        //       }
        //       return errors;
        //     },
      },
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
            // errors.rnsName = '';
            // setPublicKey('');
            // handleChange(event);
          }}
          // onBlur={handleBlur}
          // defaultValue={values.rnsName}
          autoComplete="off"
          autoFocus
          required
        />
      </InputGroup>
    </ModalFormTemplate>
  );
};

export default NewContactModal;
