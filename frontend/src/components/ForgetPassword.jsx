import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send reset link");

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h3 className="text-center">Forgot Password</h3>
        <form onSubmit={handleForgotPassword}>
          <input 
            type="email" 
            className="form-control mb-3" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="mt-2 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
