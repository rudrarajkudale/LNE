import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }), // ✅ Fix: Send `token` in body
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h3 className="text-center">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
