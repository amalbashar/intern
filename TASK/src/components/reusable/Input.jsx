import React from "react";

const Input= ({
  label,
  name,

  placeholder,
  type,
  value,
  onChange,
  errorMessage,
  validation,
  options,
}) => (
  <div>
    {label && <label htmlFor={label} className="form-label">{label}</label>}

  
    {type === "select" ? (
      <select
        value={value}
        onChange={onChange}
        className={`form-select ${validation ? "invalid" : ""}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    ) :
     type === "textarea" ? (    
         <textarea
         id={name}
         name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`form-textarea ${validation ? "invalid" : ""}`}
      />
    )
     :
      (
      <input
      id={name}
      name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`form-input ${validation ? "invalid" : ""}`}
      />
    )}
    {validation && <p className="form-validation-error">{errorMessage}</p>}
  </div>
);

export default Input;