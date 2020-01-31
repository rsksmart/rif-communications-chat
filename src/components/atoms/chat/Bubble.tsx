import React, { FC, HTMLAttributes } from 'react'

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  color: 'light' | 'primary'
}

const Bubble: FC<BubbleProps> = ({ children, color: colour }) => {
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
  )
}

export default Bubble
