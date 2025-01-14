import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface InputProps {
  label?: string; 
  name: string; 
  placeholder?: string; 
  type: "text" | "password" | "email" | "select" | "textarea"; 
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  errorMessage?: string; 
  validation?: boolean; 
  options?: Option[];
}

const Input: React.FC<InputProps> = ({
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
    {label && <label htmlFor={name} className="form-label">{label}</label>}

    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-select ${validation ? "invalid" : ""}`}
      >
          {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`form-textarea ${validation ? "invalid" : ""}`}
      />
    ) : (
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