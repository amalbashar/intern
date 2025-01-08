import React, { useState } from "react";
import Input from "../reusable/input";
import Button from "../reusable/button";


function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return; 
    onSendMessage(message);
    setMessage(""); 
  };

  return (
    <div >
      <Input
        type="text"
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button 
        label="Send" 
        onClick={handleSend} 
      />
    </div>
  );
}


export default MessageInput;

