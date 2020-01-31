import React, { FC, HTMLAttributes } from 'react'

export interface ChatLineProps extends HTMLAttributes<HTMLDivElement> {
  justified: 'start' | 'end'
}

const ChatLine: FC<ChatLineProps> = ({ justified, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '5px',
        width: '100%',
        justifyContent: `flex-${justified}`,
      }}
    >
      {children}
    </div>
  )
}

export default ChatLine
