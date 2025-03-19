import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Register.css";
import RegisterImg from "../assets/registerImg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FlashMsg from "../utils/FlashMsg";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    reasonToJoin: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlashMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "flashMessage",
          JSON.stringify({ type: "success", message: "✅ Registration successful! You can Login Now..." })
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setFlashMessage(data.message || "❌ Registration failed.");
        setFlashType("error");
      }
    } catch (error) {
      setFlashMessage("⚠️ Something went wrong. Please try again.");
      setFlashType("error");
    }
  };

  const handleGoogleSignIn = () => {
    localStorage.setItem(
      "flashMessage",
      JSON.stringify({ type: "success", message: "🎉 Welcome to Last Night Engineering!" })
    );
    setTimeout(() => {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    }, 1000);
  };

  return (
    <div className="registerContainer" style={{ marginTop: "150px" }}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
            <img src={RegisterImg} alt="Illustration" style={{ maxWidth: "75%" }} />
          </div>
          <div className="col-md-6">
            {flashMessage && <FlashMsg message={flashMessage} type={flashType} />}

            <h3 className="fw-bold text-center mb-2">😊 Join Us Today!</h3>
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

              <div className="mb-2 position-relative">
                <label className="form-label">Create Password</label>
                <div className="input-group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control"
                    name="password" 
                    placeholder="Enter password" 
                    onChange={handleChange} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ borderColor: "#ff8c00", color: "#ff8c00", backgroundColor: "transparent" }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "lightyellow"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    {showPassword ? <FaEyeSlash color="#ff8c00" /> : <FaEye color="#ff8c00" />}
                  </button>
                </div>
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
              
              <button type="submit" className="btn btn-orange w-100 mb-2">🔐 Sign Up</button>
              <button type="button" className="btn btn-outline-orange w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleSignIn}>
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" className="me-1" alt="Google" />
                Sign up with Google
              </button>
              <p className="mt-2 text-center small">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-orange"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem(
                      "flashMessage",
                      JSON.stringify({ type: "success", message: "✅ You can Login now!" })
                    );
                    window.location.href = "/login";
                  }}
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
