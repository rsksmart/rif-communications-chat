import React, { FC, HTMLAttributes } from 'react';

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  colour: 'light' | 'primary';
}

const Bubble: FC<BubbleProps> = ({ children, colour }) => {
  return (
    <div
      className={`bubble bg-${colour}`}
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: colour,
        padding: '5px',
      }}
    >
      {children}
    </div>
  );
};

export default Bubble;
