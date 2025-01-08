
import React from "react";
function Message({ text, sender, timestamp }) {
  return (
    <div >
      <strong >{sender}:</strong>
      <p >{text}</p> 
      <small >{timestamp}</small>
    </div>
  );
}

export default Message;