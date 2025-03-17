import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import LoginImg from "../assets/loginIn.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = `${import.meta.env.VITE_FRONTEND_URL}`;
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  return (
    <div className="loginContainer">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
            <img src={LoginImg} alt="Illustration" style={{ maxWidth: "75%" }} />
          </div>

          <div className="col-md-6">
            <h3 className="fw-bold text-center mb-2">Hey, You're Back!</h3>
            <p className="text-muted text-center mb-2">Enter your details</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label small" htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="/forgot-password" className="text-orange small">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-orange w-100 mb-2">Sign in</button>
              <button type="button" className="btn btn-outline-orange w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleSignIn}>
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" className="me-1" alt="Google" />
                Sign in with Google
              </button>

              <p className="mt-2 text-center small">
                Don't have an account? <a href="/register" className="text-orange">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
