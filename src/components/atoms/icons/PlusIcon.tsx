import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface PlusIconProps {}

const PlusIcon: FC<PlusIconProps> = ({ ...props }) => {
  return <FontAwesomeIcon icon={faPlus} {...props} />;
};

export default PlusIcon;
