import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Register.css";
import FlashMsg from "../utils/FlashMsg";
import forgotpassImg from '../assets/forgotpassImg.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setFlashMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send reset link");

      setFlashMessage("✅ Reset link sent to your email.");
      setFlashType("success");
    } catch (error) {
      setFlashMessage(error.message || "⚠️ Something went wrong.");
      setFlashType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerContainer d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 w-50 text-center">
        {/* 🔹 Forgot Password Image */}
        <img 
          src={forgotpassImg} 
          alt="Forgot Password" 
          className=" mx-auto d-block mb-3" 
          style={{ maxWidth: "200px" }} 
        />

        {flashMessage && <FlashMsg message={flashMessage} type={flashType} />}
        <h3 className="fw-bold text-center mb-2">🔑 Forgot Password?</h3>
        <p className="text-muted text-center mb-3">Enter your email to reset your password.</p>
        
        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label className="form-label"></label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-orange w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <p className="mt-2 text-center small">
          Remembered your password? <a href="/login" className="text-orange">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
