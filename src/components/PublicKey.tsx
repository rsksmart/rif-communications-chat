import React from 'react';

const PublicKey = ({ publicKey, ...props }) => (
  <div
    className="overflow-auto"
    style={{
      maxWidth: '100%',
      paddingLeft: props.paddingLeft || '1em',
      paddingRight: '1em',
    }}
  >
    <small>{publicKey}</small>
  </div>
);

export default PublicKey;
