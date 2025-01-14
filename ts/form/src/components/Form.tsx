import { Input, Button } from "digitinary-ui";
import { useState } from "react";

export default function Form() {
  interface fields {
    name: string;
    email: string;
    password: string;
    phone: string;
    age: string;
    country: string;
    terms: boolean;
  }

  const [formData, setFormData] = useState<fields>({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    country: "",
    terms: false,
  });

  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    age?: string;
    country?: string;
    terms?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});


  const validations = [
    {
      field: "name",
      validate: (value: string ) => {
        if (!value) return "Name is required.";
        const regex = /^\S+(\s+\S+){2,}$/;
        if (!regex.test(value)) {
          return "Name must consist of at least 3 words.";
        }
        return "";
      },
    },
    {
      field: "email",
      validate: (value: string ) => {
        const regex = /\S+@\S+\.\S+/;
        if (!value) return "Email is required.";
        if (!regex.test(value)) return "Invalid email format.";
        return "";
      },
    },
    {
      field: "password",
      validate: (value: string ) => {
        if (!value) return "Password is required.";
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!regex.test(value)) {
          return "Password must be at least 8 characters, include  one number and one special character.";
        }
        return "";
      },
    },
    {
      field: "phone",
      validate: (value: string) => {
        if (!value) return "Phone Number is required.";
        const regex = /^[0-9]{10}$/;
        if (!regex.test(value)) {
          return "Phone Number must be exactly 10 digits.";
        }
        return "";
      },
    },
    {
      field: "age",
      validate: (value: string) => {
        if (!value) return "Age is required.";
        if (isNaN(Number(value))) {
          return "Age must be a valid number.";
        }
        if (Number(value) < 18 || Number(value) > 65) {
          return "Age must be between 18 and 65.";
        }
        return "";
      },
    },
    {
      field: "country",
      validate: (value: string ) =>
        !value ? "Country selection is required." : "",
    },
    {
      field: "terms",
      validate: (value: string | boolean) =>
        !value ? "You must agree to the terms and conditions." : "",
    },
  ];



  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      placeholder: "Enter your full name",
      required: true,
      helperText: "Your full legal name",
    },
    {
      label: "Email Address",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
      helperText: "A valid email address",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter a strong password",
      required: true,
      helperText: "At least 8 characters, a number, and a special character",
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phone",
      placeholder: "Enter your phone number",
      required: true,
      helperText: "10-digit phone number",
    },
    {
      label: "Age",
      type: "number",
      name: "age",
      placeholder: "Enter your age",
      required: true,
      helperText: "Your age (18-65)",
    },
    {
        type: "select",
        label: "Country",
        name: "country",
        options:  ["Jerash", "Salt", "Ajlun", "Irbid"], 
        required: true,
        placeholder: "Select a country",
      },
      
      {
        type: "checkbox",
        label: "Agree to Terms",
        name: "terms",
        required: true,
        placeholder: "",
      },
  ];
  
  
  const validateField = (name: keyof fields, value: string ) => {
    let error = "";

    validations.forEach((rule) => {
      if (rule.field === name) {
        error = rule.validate(value);
      }
    });

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (
    name: keyof fields,
    value: string 
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleInputChange(name as keyof fields, value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, checked } = e.target;
    
    handleInputChange(name as keyof fields, checked);
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value) &&
    Object.values(errors).every((error) => !error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <form 
    style={{
        width: "400px", 
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px", 
        backgroundColor: "#f9f9f9",
      }}
      onSubmit={handleSubmit}>
      
      {inputFields.map((field) => {
  if (field.type === "select") {
    return (
      <div key={field.name}>
        <label htmlFor={field.name}>{field.label}</label>
        <select
          id={field.name}
          name={field.name}
          value={formData[field.name as keyof fields]}
          onChange={handleSelectChange}
          required={field.required}
        >
          <option value="">{field.placeholder}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors[field.name as keyof FormErrors] && (
          <p>{errors[field.name as keyof FormErrors]}</p>
        )}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div key={field.name}>
        <label htmlFor={field.name}>
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={formData[field.name as keyof fields] as boolean}
            onChange={handleCheckboxChange}
          />
          {field.label}
        </label>
        {errors[field.name as keyof FormErrors] && (
          <p>{errors[field.name as keyof FormErrors]}</p>
        )}
      </div>
    );
  }

  return (
    <Input
      key={field.name}
      label={field.label}
      type={field.type}
      name={field.name}
      value={formData[field.name as keyof fields]}
      onChange={(value: string | number | boolean) =>
        handleInputChange(field.name as keyof fields, value)
      }
      errorMsg={errors[field.name as keyof FormErrors]}
      placeholder={field.placeholder}
      required={field.required}
    />
  );
})}

    
      <Button type="submit" disabled={!isFormValid()}>
        Submit
      </Button>
    </form>
  );
}
