import React, { FC, HTMLAttributes } from 'react';
import {
  InputGroup as BSInputGroup,
  InputGroupProps as BSInputGroupProps,
} from 'react-bootstrap';

export interface InputGroupProps
  extends BSInputGroupProps,
    HTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputGroup: FC<InputGroupProps> = ({ children, ...rest }) => {
  return <BSInputGroup {...rest}>{children}</BSInputGroup>;
};

export default InputGroup;
