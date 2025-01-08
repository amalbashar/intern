import React, { useState } from "react";
import api from "../components/ecom/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/reusable/input";
import Button from "../components/reusable/Button";




const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      validation: (value) => {
        if (!value) return "Email is required.";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
        if (!emailRegex.test(value)) return "Enter a valid email address.";
        return "";
      },
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      validation: (value) => {
        if (!value) return "Password is required.";
        if (value.length < 6)
          return "Password must be at least 6 characters long.";
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

    console.log("Form Data:", formData);

    const newErrors = {};
    fields.forEach((field) => {
      const error = field.validation(formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    console.log({
      newErrors,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await api.post("/auth/login", formData);
      const token = response.data.access_token;

      console.log("Response Data:", response.data);

      localStorage.setItem("token", token);
      setMessage("Login successful!");

      onLogin();

      setTimeout(() => {
        navigate("/");
      });
    } catch (error) {
      console.log("Error Response:", error);

      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 >Login</h1>
        {isLoading && (
          <p >Processing your request...</p>
        )}
        {message && (
          <p
            className={`form-message ${
              message.includes("successful") ? "form-message-success" : "form-message-error"
            }`}
          >
            {message}
          </p>
        )}
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange(field.name)}
            validation={errors[field.name]}
            errorMessage={errors[field.name]}
          />
        ))}
     <Button
        label="Login"
        type="submit"
        className="form-button"
        isLoading={isLoading}
        loadingText="Logging in..."
        disabled={
          Object.values(errors).some((error) => error) ||
          fields.some((field) => !formData[field.name])
        }
      />
      </form>

      <p className="form-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
