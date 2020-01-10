import React, { FC } from 'react';

import Button from 'components/atoms/buttons/Button';
import ModalDialogue from 'components/molecules/ModalForm';
import { Form } from 'components/atoms/forms';
import { ModalProps } from 'components/atoms/modal/Modal';

export interface ModalFormProps {
  formik: any;
  modalProps: ModalProps;
  submitBtnLabel: string;
  title: string;
}

const ModalForm: FC<ModalFormProps> = ({
  formik,
  children,
  submitBtnLabel,
  title,
  modalProps,
}) => {
  return (
    <Form>
      <ModalDialogue
        title={title}
        footer={
          <Button
            variant="primary"
            type="button"
            className="ml-auto justify-content-end"
            disabled={!formik.isValid}
            onClick={formik.submitForm}
          >
            {submitBtnLabel}
          </Button>
        }
        {...modalProps}
      >
        {children}
      </ModalDialogue>
    </Form>
  );
};

export default ModalForm;
