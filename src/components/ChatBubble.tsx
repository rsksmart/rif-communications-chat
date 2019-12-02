import React from "react";

import Message, { MESSAGE_SENDER } from "models/Message";

interface IChatBubbleProps {
  message: Message;
}

export default ({ message }: IChatBubbleProps) => {
  if (message.sender === MESSAGE_SENDER.ME)
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          right: 0,
          backgroundColor: "#e6f7ff",
          padding: "5px",
          marginLeft: "auto"
        }}
      >
        {message.content}
      </div>
    );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "5px"
      }}
      className="bg-light"
    >
      <p>{message.content}</p>
    </div>
  );
};
