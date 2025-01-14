import React from "react";

const Button = ({ 
  label, 
  onClick, 
  type = "button", 
  disabled = false, 
  className = "" 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${disabled ? "btn-disabled" : ""} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
