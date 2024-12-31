import React, { useState } from "react";

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSendMessage(message); 
    setMessage(""); //    بفضي المكان
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="text .."
        value={message}
        onChange={(e) => setMessage(e.target.value)} // تحديث النص  
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;