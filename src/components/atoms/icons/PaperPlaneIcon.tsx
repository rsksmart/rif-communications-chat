import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export interface PaperPlaneIconProps {}

const PaperPlaneIcon: FC<PaperPlaneIconProps> = ({ ...props }) => {
  return <FontAwesomeIcon icon={faPaperPlane} {...props} />;
};

export default PaperPlaneIcon;
