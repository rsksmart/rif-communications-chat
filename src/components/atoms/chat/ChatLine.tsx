import React, { HTMLAttributes, FC } from 'react';

export interface ChatLineProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  justified: 'start' | 'end';
}

const ChatLine: FC<ChatLineProps> = ({ index, justified, children }) => {
  return (
    <div
      key={index}
      style={{
        display: 'flex',
        marginBottom: '5px',
        width: '100%',
        justifyContent: `flex-${justified}`,
      }}
    >
      {children}
    </div>
  );
};

export default ChatLine;
