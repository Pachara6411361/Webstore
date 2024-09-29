"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/users", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setError("");
        router.push("/login");
      } else {
        setError(
          response.data.message || "An error occurred during registration."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        return;
      }
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              className="auth-input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="auth-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="auth-input"
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              className="auth-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
