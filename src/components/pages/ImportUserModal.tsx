import React, { FC, useState } from 'react';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import { InputGroup, FormControl } from 'components/atoms/forms';
import { useFormik } from 'formik';
import SmallText from 'components/atoms/SmallText';

export interface ImportUserModalProps {
  show: boolean;
  onHide: () => void;
}

interface FormValues {
  importText: string;
}

interface FormErrors {
  importText?: string;
}

const initialErrors: FormErrors = {
  importText: '',
};

const ImportUserModal: FC<ImportUserModalProps> = ({ show, onHide }) => {
  // const {
  //   state: { UserState, AppState },
  //   dispatch,
  // } = useContext(UserStore);

  // const [, setIsImport] = useState(false);
  // const [, setTitle] = useState('');
  const [errors, setErrors] = useState(initialErrors);

  // const handleImport = () => {
  //   setIsImport(true);
  //   setTitle('Import profile.');
  // };
  // const handleClose = () => {
  //   setIsImport(false);
  // };

  // const { isLoading } = appState;

  // let errors: FormErrors = {};
  const formikProps = {
    initialErrors: {
      importText: 'TMP',
    },
    initialValues: {
      importText: '',
    },
    onSubmit: () => {},
    // TODO: this can be DRY-ed more (extract all validations)
    validate: ({ importText }: FormValues) => {
      setErrors(initialErrors);
      try {
        // TODO: Maybe add checking against schema of a User (could use Yup)
        JSON.parse(importText);
      } catch (_) {
        setErrors({ importText: 'Text has to be JSON parsable.' });
      }
      return errors;
    },
  };

  const formik = useFormik(formikProps);

  const modalTemplateProps: ModalFormTemplateProps = {
    className: 'import-user',
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

  const { handleChange, handleBlur } = formik;
  return (
    <ModalFormTemplate {...modalTemplateProps}>
      <InputGroup className="mb-3" style={{ marginTop: '1em' }}>
        <FormControl
          aria-describedby="basic-addon2"
          as="textarea"
          rows="5"
          onChange={e => handleChange(e)}
          style={{ height: '60vh' }}
          name="importText"
          onBlur={handleBlur}
          autoFocus
          required
        />
        {/* TODO: this can be DRY-ed more (see other modal pages)  */}

        {/* {isLoading && <small>Waiting for server...</small>} */}
      </InputGroup>
      {errors.importText && (
        <SmallText style={{ color: 'red', alignSelf: 'center' }}>
          {errors.importText}
        </SmallText>
      )}
    </ModalFormTemplate>
  );
};

export default ImportUserModal;
