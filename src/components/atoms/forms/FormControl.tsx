import React, { FC, FormHTMLAttributes } from 'react';
import {
  FormControl as BSFormControl,
  FormControlProps as BSFormControlProps,
} from 'react-bootstrap';

export interface FormControlProps extends BSFormControlProps {
  autoFocus?: boolean;
  required?: boolean;
}

const FormControl: FC<FormControlProps &
  FormHTMLAttributes<HTMLInputElement>> = ({
  autoFocus,
  required,
  ...rest
}) => {
  return <BSFormControl autoFocus={autoFocus} required={required} {...rest} />;
};

export default FormControl;
