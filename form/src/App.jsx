import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    age: "",
    country: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // لحالة عرض الـ popup
  const [submittedData, setSubmittedData] = useState(null); // البيانات التي تم إرسالها

  const fields = [
    // الحقول نفسها كما هي، لا حاجة لتغييرها
    {
      label: "Full Name*",
      type: "text",
      name: "name",
      validation: (value) => {
        if (!value) return "Name is required.";
        const regex = /^\S+(\s+\S+){2,}$/;
        if (!regex.test(value)) {
          return "Name must consist of at least 3 words.";
        }
        return "";
      },
    },
    {
      label: "Email*",
      type: "email",
      name: "email",
      validation: (value) => {
        const regex = /\S+@\S+\.\S+/;
        if (!value) return "Email is required.";
        if (!regex.test(value)) return "Invalid email format.";
        return "";
      },
    },
    {
      label: "Password*",
      type: "password",
      name: "password",
      validation: (value) => {
        if (!value) return "Password is required.";
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!regex.test(value)) {
          return "Password must be at least 8 characters, include at least one number and one special character.";
        }
        return "";
      },
    },
    {
      label: "Phone Number*",
      type: "text",
      name: "phonenumber",
      validation: (value) => {
        if (!value) return "Phone Number is required.";
        const regex = /^[0-9]{10}$/;
        if (!regex.test(value)) {
          return "Phone Number must be exactly 10 digits.";
        }
        return "";
      },
    },
    {
      label: "Age*",
      type: "number",
      name: "age",
      validation: (value) => {
        if (value === undefined || value === null || value === "") {
          return "Age is required.";
        }
        if (isNaN(value)) {
          return "Age must be a valid number.";
        }
        if (value < 18 || value > 65) {
          return "Age must be between 18 and 65.";
        }
        return "";
      },
    },
    {
      label: "City*",
      type: "select",
      name: "country",
      options: [
        { value: "", label: "Select a country" },
        { value: "Jerash", label: "Jerash" },
        { value: "Salt", label: "Salt" },
        { value: "Irbid", label: "Irbid" },
        { value: "Ajloun", label: "Ajloun" },
        { value: "Amman", label: "Amman" },
      ],
      validation: (value) => {
        if (!value) return "Country selection is required.";
        return "";
      },
    },
    {
      label: "Agree to Terms*",
      type: "checkbox",
      name: "agreeToTerms",
      validation: (value) => {
        if (!value) return "You must agree to the terms and conditions.";
        return "";
      },
    },
  ];

  const handleChange = (name) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
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

    setSubmittedData(formData); // حفظ البيانات المرسلة
    setIsSubmitted(true); // عرض الـ popup
    setFormData({
      name: "",
      email: "",
      password: "",
      phonenumber: "",
      age: "",
      country: "",
      agreeToTerms: false,
    }); // تفريغ الحقول
    setErrors({}); // مسح الأخطاء
  };

  const closePopup = () => {
    setIsSubmitted(false); // إخفاء الـ popup
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
              field.type === "checkbox"
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

      {isSubmitted && (
        <div className="popup">
          <div className="popup-content">
            <h2>Form Submitted Successfully!</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
