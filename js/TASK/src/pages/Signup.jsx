import React, { useState } from "react";
import api from "../components/ecom/axiosInstance";
import { Link } from 'react-router-dom';
import Input from "../components/reusable/input";
import Button from "../components/reusable/Button";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      validation: (value) => {
        if (!value) return "Name is required.";
        if (value.length < 3) return "Name must be at least 3 characters.";
        return "";
      },
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      validation: (value) => {
        if (!value) return "Email is required.";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
        if (!emailRegex.test(value)) return "Invalid email address. ";
        return "";
      },
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      validation: (value) => {
        if (!value) return "Password is required.";
        if (!/^[A-Za-z0-9]+$/.test(value))
          return "Password must contain only letters and numbers.";
        if (value.length < 6)
          return "Password must be at least 6 characters long.";
        return "";
      },
    },
    {
      label: "Avatar URL",
      type: "url",
      name: "avatar",
      placeholder: "Enter your avatar URL",
      validation: (value) => {
        if (!value) return "Avatar URL is required.";
        const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
        if (!urlRegex.test(value)) return "Invalid URL format.";
        return "";
      },
    },
  ];

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const field = fields.find((field) => field.name === name);
    const error = field ? field.validation(value) : "";
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const newErrors = {};
    fields.forEach((field) => {
      const error = field.validation(formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/users", formData);

      setMessage("Signup successful! You can now login.");
      setFormData({ name: "", email: "", password: "", avatar: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} >
        <h1 >Signup</h1>
        {isLoading && <p >Processing your request...</p>}
        {message && (
        
            {message}
          
        )}
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange(field.name)}
            validation={errors[field.name]}
            errorMessage={errors[field.name]}
          />
        ))}
      <Button
  label="Signup"
  type="submit"
  isLoading={isLoading}
  loadingText="Signing up..."
  disabled={
    isLoading ||
    Object.values(errors).some((error) => error) ||
    fields.some((field) => !formData[field.name])
  }
/>
      </form>

       have an account? <Link to="/login">log in</Link>

    </div>
  );
};

export default Signup;
