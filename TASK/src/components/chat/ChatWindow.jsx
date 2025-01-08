import React, { useRef, useEffect } from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
  return (
    <div >
      {messages.map((msg, index) => (
        <Message
          key={index}
          sender={msg.sender}
          text={msg.text}
          timestamp={msg.timestamp}
        />
      ))}
    </div>
  );
}

export default ChatWindow;