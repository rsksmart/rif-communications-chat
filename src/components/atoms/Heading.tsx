import React, { FC, HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: number;
}

const Heading: FC<HeadingProps> = ({ level, children, ...rest }) =>
  React.createElement(`h${level}`, rest, children);

export default Heading;
