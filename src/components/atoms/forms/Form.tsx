import React, { FC, HTMLAttributes } from 'react';

export interface FormProps extends HTMLAttributes<HTMLFormElement> {}

const Form: FC<FormProps> = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};

export default Form;
