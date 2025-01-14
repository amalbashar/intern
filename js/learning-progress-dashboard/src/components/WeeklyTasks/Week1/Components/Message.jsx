import React from "react";
function Message({ text, sender, timestamp }) {
    return (
      <div style={{ marginBottom: "10px" }}>
        <strong>{sender}:</strong>
        <p style={{ whiteSpace: "pre-line", margin: "5px 0" }}>{text}</p> 
        <small style={{ color: "#888" }}>{timestamp}</small>
      </div>
    );
  }
  
  export default Message;
  