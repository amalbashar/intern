import React from "react";

const InputField = ({
  label,
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
    ) : (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`form-input ${validation ? "invalid" : ""}`}
      />
    )}
    {validation && <p className="invalid-feedback">{errorMessage}</p>}
  </div>
);

export default InputField;