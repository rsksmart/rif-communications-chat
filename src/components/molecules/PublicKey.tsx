import React, { FC } from 'react';
import SmallText from 'components/atoms/SmallText';

export interface PublicKeyProps {
  publicKey: string;
  style?: Object;
}

const PublicKey: FC<PublicKeyProps> = ({ publicKey, style }) => (
  <div
    className="overflow-auto"
    style={{
      ...{
        maxWidth: '100%',
        paddingLeft: '1em',
        paddingRight: '1em',
      },
      ...style,
    }}
  >
    <SmallText>{publicKey}</SmallText>
  </div>
);

export default PublicKey;
