import React, { FC } from 'react';
import { useFormik, FormikConfig } from 'formik';

import Button from 'components/atoms/buttons/Button';
import ModalDialogue from 'components/molecules/ModalDialogue';
import { Form } from 'components/atoms/forms';
import { ModalProps } from 'react-bootstrap';

export interface ModalFormProps {
  formikProps: FormikConfig<Object>;
  modalProps: ModalProps;
  submitBtnLabel: string;
  title: string;
}

const ModalForm: FC<ModalFormProps> = ({
  formikProps,
  children,
  submitBtnLabel,
  title,
  modalProps,
}) => {
  const formik = useFormik(formikProps);

  return (
    <ModalDialogue
      title={title}
      footer={
        <Button
          variant="primary"
          type="submit"
          className="ml-auto justify-content-end"
          disabled={!formik.isValid}
        >
          {submitBtnLabel}
        </Button>
      }
      {...modalProps}
    >
      <Form onSubmit={formik.handleSubmit}>{children}</Form>
    </ModalDialogue>
  );
};

export default ModalForm;
