import React, { FC } from 'react';
import ChatLine, { ChatLineProps } from 'components/atoms/chat/ChatLine';
import Bubble, { BubbleProps } from 'components/atoms/chat/Bubble';

interface ChatBubbleProps extends ChatLineProps, BubbleProps {}

const ChatBubble: FC<ChatBubbleProps> = ({ children, colour, ...props }) => {
  return (
    <ChatLine {...props}>
      <Bubble colour={colour}>{children}</Bubble>
    </ChatLine>
  );
};

export default ChatBubble;
