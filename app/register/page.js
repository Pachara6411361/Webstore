// pages/register/page.js
import React from 'react';


const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label> {/* Changed Username to Name */}
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              className="auth-input"
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label> {/* Added Confirm Password field */}
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
