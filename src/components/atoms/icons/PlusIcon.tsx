import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

export interface PlusIconProps {}

const PlusIcon: FC<PlusIconProps> = ({ ...props }) => {
  return <FontAwesomeIcon icon={faPlus} {...props} />;
};

export default PlusIcon;
