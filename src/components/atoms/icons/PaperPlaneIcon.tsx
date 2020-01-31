import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

export interface PaperPlaneIconProps {}

const PaperPlaneIcon: FC<PaperPlaneIconProps> = ({ ...props }) => {
  return <FontAwesomeIcon icon={faPaperPlane} {...props} />;
};

export default PaperPlaneIcon;
