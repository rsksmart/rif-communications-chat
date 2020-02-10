import Bubble, { BubbleProps } from 'components/atoms/chat/Bubble'
import ChatLine, { ChatLineProps } from 'components/atoms/chat/ChatLine'
import React, { FC } from 'react'

interface ChatBubbleProps extends ChatLineProps { }

const ChatBubble: FC<ChatBubbleProps & BubbleProps> = ({ children, color, ...props }) => {
  return (
    <ChatLine {...props}>
      <Bubble color={color}>{children}</Bubble>
    </ChatLine>
  )
}

export default ChatBubble
