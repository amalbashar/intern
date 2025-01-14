import React, { useRef, useEffect } from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
 
 

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "300px",
        overflowY: "scroll",
      }}
    >
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