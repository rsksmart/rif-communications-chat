import React, { FC } from 'react';
import Button, { ButtonProps } from './Button';

export interface ButtonCircleProps extends ButtonProps {}

const ButtonCircle: FC<ButtonCircleProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Button className={`btn-circle ${className}`} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonCircle;
