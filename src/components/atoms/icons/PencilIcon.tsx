import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

export interface PencilIconProps {}

const PencilIcon: FC<PencilIconProps> = ({ ...props }) => {
  return <FontAwesomeIcon icon={faPencilAlt} {...props} />;
};

export default PencilIcon;
