import React, { FC } from 'react';
import SmallText from 'components/atoms/SmallText';

export interface PublicKeyProps {
  publicKey: string;
  paddingLeftOverrides?: string;
}

const PublicKey: FC<PublicKeyProps> = ({ publicKey, paddingLeftOverrides }) => (
  <div
    className="overflow-auto"
    style={{
      maxWidth: '100%',
      paddingLeft: paddingLeftOverrides || '1em',
      paddingRight: '1em',
    }}
  >
    <SmallText>{publicKey}</SmallText>
  </div>
);

export default PublicKey;
