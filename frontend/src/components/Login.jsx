import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css"; // Custom CSS
import LoginImg from "../assets/loginIn.png";

const Login = () => {
  return (
    <div className="loginContainer">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          {/* Left Section - Image */}
           <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
                      <img src={LoginImg} alt="Illustration" style={{ maxWidth: "75%" }} />
                    </div>

          {/* Right Section - Form */}
          <div className="col-md-6">
            <h3 className="fw-bold text-center mb-2">Hey, You're Back!</h3>
            <p className="text-muted text-center mb-2">Enter your details</p>

            <form>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>

              <div className="mb-2">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label small" htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#" className="text-orange small">Forgot password?</a>
              </div>

              <button className="btn btn-orange w-100 mb-2">Sign in</button>
              <button className="btn btn-outline-orange w-100 d-flex align-items-center justify-content-center">
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