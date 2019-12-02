import React from "react";

import Message, { MESSAGE_SENDER } from "models/Message";

interface IChatBubbleProps {
  message: Message;
  index: any;
}

export default ({ message, index }: IChatBubbleProps) => {
  if (message.sender === MESSAGE_SENDER.ME)
    return (
      <div
        key={index}
        style={{
          display: "flex",
          marginBottom: "5px",
          width: "100%"
        }}
      >
        <span
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#e6f7ff",
            padding: "5px",
            marginLeft: "auto"
          }}
        >
          {message.content}
        </span>
      </div>
    );

  return (
    <div
      key={index}
      style={{
        display: "flex",
        marginBottom: "5px",
        width: "100%"
      }}
    >
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
    </div>
  );
};
