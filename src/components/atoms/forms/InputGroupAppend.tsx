import React, { FC } from 'react';
import {
  InputGroup as BSInputGroup,
  InputGroupProps as BSInputGroupProps,
} from 'react-bootstrap';

export interface InputGroupAppendProps extends BSInputGroupProps {}

const InputGroupAppend: FC<InputGroupAppendProps> = ({
  children,
  ...props
}) => {
  return <BSInputGroup.Append {...props}>{children}</BSInputGroup.Append>;
};

export default InputGroupAppend;
