import React, { FC } from 'react'

import ChatBubble from 'components/molecules/ChatBubble'
import Message, { MESSAGE_SENDER } from 'models/Message'

export interface ChatDisplayProps {
  chat: Message[]
}

const ChatDisplay: FC<ChatDisplayProps> = ({ chat }) => {
  return (
    <div
      className="chat-display"
      style={{
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingBottom: '56px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {chat.map((message, i) => {
        const colour =
          message.sender === MESSAGE_SENDER.ME ? 'light' : 'primary'
        const justified =
          message.sender === MESSAGE_SENDER.ME ? 'start' : 'end'
        return (
          <ChatBubble
            color={colour}
            index={i}
            justified={justified}
            key={message.timestamp}
          >
            {message.content}
          </ChatBubble>
        )
      })}
      <div
        ref={el => {
          if (el) el.scrollIntoView()
        }}
      />
    </div>
  )
}

export default ChatDisplay
