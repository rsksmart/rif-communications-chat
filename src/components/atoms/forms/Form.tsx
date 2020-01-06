import React, { FC, HTMLAttributes } from 'react';
import { Form as BSForm, FormProps as BSFormProps } from 'react-bootstrap';

export interface FormProps
  extends BSFormProps,
    HTMLAttributes<HTMLFormElement> {}

const Form: FC<FormProps> = ({ children, className, ...props }) => {
  return (
    <form className={`${className}-form`} {...props}>
      {children}
    </form>
  );
};

export default Form;
