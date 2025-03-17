import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import RegisterImg from "../assets/registerImg.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    reasonToJoin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, formData);
      alert("Registration successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  return (
    <div className="registerContainer">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
            <img src={RegisterImg} alt="Illustration" style={{ maxWidth: "75%" }} />
          </div>

          <div className="col-md-6">
            <h3 className="fw-bold text-center mb-2">Join Us Today!</h3>
            <p className="text-muted text-center mb-2">Become a Member</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="fullName" placeholder="Enter full name" onChange={handleChange} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Create Password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Why do you want to join?</label>
                <select 
                className="form-control" 
                name="reasonToJoin" 
                value={formData.reasonToJoin || ""} 
                onChange={handleChange} 
                required
                >
                  <option value="" disabled>-- Select an Option --</option>
                  <option value="I need a project">I need a project</option>
                  <option value="I want to explore notes">I want to explore notes</option>
                  <option value="I want to start learning">I want to start learning</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-orange w-100 mb-2">Sign Up</button>
              <button type="button" className="btn btn-outline-orange w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleSignIn}>
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" className="me-1" alt="Google" />
                Sign up with Google
              </button>
              <p className="mt-2 text-center small">
                Already have an account? <a href="/login" className="text-orange">Login</a>
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
