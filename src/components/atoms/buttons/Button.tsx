import React, { FC, HTMLAttributes } from 'react'
import {
  Button as BSButton,
  ButtonProps as BSButtonProps,
} from 'react-bootstrap'

export interface ButtonProps
  extends BSButtonProps,
  HTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  return (
    <BSButton className={`btn ${className}`} {...rest}>
      {children}
    </BSButton>
  )
}

export default Button
