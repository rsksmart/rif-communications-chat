import Bubble, { BubbleProps } from 'components/atoms/chat/Bubble';
import ChatLine, { ChatLineProps } from 'components/atoms/chat/ChatLine';
import React, { FC } from 'react';

interface ChatBubbleProps extends ChatLineProps, BubbleProps {}

const ChatBubble: FC<ChatBubbleProps> = ({ children, colour, ...props }) => {
  return (
    <ChatLine {...props}>
      <Bubble colour={colour}>{children}</Bubble>
    </ChatLine>
  );
};

export default ChatBubble;
