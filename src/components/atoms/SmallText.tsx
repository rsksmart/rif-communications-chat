import React from 'react';

const SmallText = (children: React.ReactNode, ...props: any[]) => {
  return <small {...props}>{children}</small>;
};

export default SmallText;
