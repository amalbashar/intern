import React, { useState, useEffect } from "react";
import "../App.css";

import InputField from "./InputField";

const Form = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); 


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const fields = [
    {
      label: "Task name*",
      type: "text",
      name: "name",
      validation: (value) => {
        if (!value) return "Name is required.";
        if (value.length < 3) {
          return "Name must consist of at least 3 characters.";
        }
        return "";
      },
    },
    {
      label: "Date*",
      type: "date",
      name: "date",
      validation: (value) => {
        if (!value) return "Date is required.";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate <= today) {
          return "Date must be in the future.";
        }
        return "";
      },
    },
    {
      label: "Priority*",
      type: "select",
      name: "priority",
      options: [
        { value: "", label: "Select priority" },
        { value: "low", label: "low" },
        { value: "medium", label: "medium" },
        { value: "high", label: "high" },
      ],
      validation: (value) => {
        if (!value) return "Country selection is required.";
        return "";
      },
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      validation: (value) => {
        if (value && value.length > 200) {
          return "Description must be less than 200 characters.";
        }
        return "";
      },
    },
  ];

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });

    const field = fields.find((field) => field.name === name);
    const error = field ? field.validation(value) : "";
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    fields.forEach((field) => {
      const error = field.validation(formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);


    setSuccessMessage("Task submitted successfully!");



    setFormData({
      name: "",
      date: "",
      priority: "",
      description: "",
    });
    setErrors({});
    setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange(field.name)}
            options={field.options}
            validation={errors[field.name]}
            errorMessage={errors[field.name]}
          />
        ))}

<button
          type="submit"
          disabled={
            Object.values(errors).some((error) => error) ||
            fields.some((field) =>
              field.name === "description"
                ? false
                : field.type === "checkbox"
                ? !formData[field.name]
                : field.type === "select"
                ? !formData[field.name]
                : !formData[field.name]
            )
          }
        >
          Submit
        </button>
      </form>
      {successMessage && (
      <div
        style={{
          color: "green",
          marginTop: "10px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {successMessage}
      </div>
    )}
    </div>
  );
};

export default Form;
