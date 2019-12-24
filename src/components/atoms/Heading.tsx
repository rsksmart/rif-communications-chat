import React from 'react';

const Heading = ({ level, children, ...props }) =>
  React.createElement(`h${level}`, props, children);

export default Heading;
