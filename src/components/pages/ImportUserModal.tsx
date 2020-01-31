import { FormControl, InputGroup } from 'components/atoms/forms';
import { FormInfoBar } from 'components/molecules/FormInfoBar';
import ModalFormTemplate, {
  ModalFormTemplateProps,
} from 'components/templates/ModalFormTemplate';
import { useFormik } from 'formik';
import React, { FC, useContext, useState } from 'react';
import { APP_ACTIONS } from 'store/App/appActions';
import { checkUserExists } from 'store/User/userActions';
import UserStore from 'store/User/UserStore';
import { IUserRecData, recoverUser } from 'store/User/userUtils';
import LocalStorage from 'utils/LocalStorage';
import Logger from 'utils/Logger';
const persistence = LocalStorage.getInstance();
const logger = Logger.getInstance();

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
  const { dispatch } = useContext(UserStore);

  interface IImportJSON extends IUserRecData {
    rnsName: string;
  }

  const [importJson, setImportJson] = useState<IImportJSON>();

  const formikProps = {
    initialErrors,
    initialValues: {
      importText: '',
    },
    onSubmit: async ({ importText }: FormValues, actions) => {
      if (importJson) {
        try {
          importJson && (await recoverUser(importJson, dispatch));
          const { rnsName, keystore, contacts } = importJson;
          persistence.setItem('contacts', contacts);
          persistence.setItem('keystore', keystore);
          persistence.setItem('rnsName', rnsName);
          actions.resetForm();
          actions.setErrors({});
          onHide();
        } catch (err) {
          logger.error('Could not recover user:', err);
        }
      }
    },
    validate: async ({ importText }: FormValues) => {
      dispatch({
        type: APP_ACTIONS.SET_IS_LOADING,
        payload: {
          isLoading: true,
          message: `Checking...`,
        },
      });
      const errors: FormErrors = {};
      try {
        const textJson = JSON.parse(importText);
        const { rnsName, keystore } = textJson;
        const userExists = await checkUserExists(rnsName);
        // TOFOO: Ugh bleah
        if (!userExists) {
          errors.importText = 'Must contain a valid RNS name.';
        } else if (!keystore) {
          errors.importText = 'Must contain keystore.';
        } else {
          setImportJson(textJson);
        }
      } catch (_) {
        errors.importText = 'Text has to be JSON parsable.';
      } finally {
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: false },
        });
      }
      return errors;
    },
  };

  const formik = useFormik(formikProps);

  const modalTemplateProps: ModalFormTemplateProps = {
    className: 'import-user',
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
    values: { importText },
    handleBlur,
    errors,
  } = formik;
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
          defaultValue={importText}
          onBlur={handleBlur}
          autoFocus={true}
          required={true}
        />
      </InputGroup>
      <FormInfoBar error={errors.importText} />
    </ModalFormTemplate>
  );
};

export default ImportUserModal;
