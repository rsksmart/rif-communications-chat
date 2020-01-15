import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export interface PencilIconProps {}

const PencilIcon: FC<PencilIconProps> = ({ ...props }) => {
  return <FontAwesomeIcon icon={faPencilAlt} {...props} />;
};

export default PencilIcon;
