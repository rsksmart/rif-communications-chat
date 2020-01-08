import React, { FC, FormHTMLAttributes } from 'react';
import {
  Form as BSForm,
  FormControlProps as BSFormControlProps,
} from 'react-bootstrap';

export interface FormControlProps extends BSFormControlProps {
  autoFocus?: boolean;
  required?: boolean;
  as?: any;
  rows?: any;
}

const FormControl: FC<FormControlProps &
  FormHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return <BSForm.Control {...rest} />;
};

export default FormControl;
