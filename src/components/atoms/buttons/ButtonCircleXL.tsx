import React, { FC } from 'react';
import ButtonCircle, { ButtonCircleProps } from './ButtonCircle';

export interface ButtonCircleXLProps extends ButtonCircleProps {}

const ButtonCircleXL: FC<ButtonCircleXLProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <ButtonCircle className={`btn-xl ${className}`} {...rest}>
      {children}
    </ButtonCircle>
  );
};

export default ButtonCircleXL;
