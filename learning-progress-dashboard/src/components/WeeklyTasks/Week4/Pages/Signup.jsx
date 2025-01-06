import React, { useState } from "react";
import api from "../Services/axiosInstance";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!formData.name || !formData.email || !formData.password || !formData.avatar) {
      setMessage("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/users", formData);

      setMessage("Signup successful! You can now login.");
      setFormData({ name: "", email: "", password: "", avatar: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Signup</h1>
        {isLoading && <p className="loading-message">Processing your request...</p>}
        {message && (
          <p
            className={`message ${
              message.includes("successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password (letters and numbers only)"
            value={formData.password}
            onChange={handleChange}
            pattern="[A-Za-z0-9]+"
            title="Password must contain only letters and numbers"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
