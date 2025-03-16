import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import RegisterImg from "../assets/registerImg.png";

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
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful!");
    } catch (error) {
      alert(error.response.data.message || "Registration failed");
    }
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
                <select className="form-control" name="reasonToJoin" onChange={handleChange} required>
                  <option disabled selected>-- Select an Option --</option>
                  <option>I need a project</option>
                  <option>I want to explore notes</option>
                  <option>I want to start learning</option>
                  <option>Other</option>
                </select>
              </div>

              <button className="btn btn-orange w-100 mb-2">Sign Up</button>

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
