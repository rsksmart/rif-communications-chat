import React, { FC } from 'react';
import {
  InputGroup as BSInputGroup,
  InputGroupProps as BSInputGroupProps,
} from 'react-bootstrap';

export interface InputGroupTextProps extends BSInputGroupProps {
  id?: string;
}

const InputGroupText: FC<InputGroupTextProps> = ({ children, ...props }) => {
  return <BSInputGroup.Text {...props}>{children}</BSInputGroup.Text>;
};

export default InputGroupText;
