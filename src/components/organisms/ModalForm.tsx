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
    <ModalDialogue
      title={title}
      footer={
        <Button
          variant="primary"
          type="submit"
          className="ml-auto justify-content-end"
          disabled={!formik.isValid}
          onClick={event => {
            // event.preventDefault();
            return false;
          }}
        >
          {submitBtnLabel}
        </Button>
      }
      {...modalProps}
      wrapper={Form}
      wrapperProps={{
        onSubmit: () => formik.handleSubmit(),
      }}
    >
      {children}
    </ModalDialogue>
  );
};

export default ModalForm;
