import React, { HTMLAttributes, FC } from 'react';

export interface SmallTextProps extends HTMLAttributes<HTMLElement> {}

const SmallText: FC<SmallTextProps> = ({ children, ...props }) => {
  return <small {...props}>{children}</small>;
};

export default SmallText;
