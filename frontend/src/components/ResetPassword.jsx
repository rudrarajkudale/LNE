import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div
      className="registerContainer"
      style={{
        marginTop: "170px",
        border: "2px solid #ff8c00",  // ✅ Border added around the container
        borderRadius: "12px",         // ✅ Rounded corners
        padding: "30px",              // ✅ Padding for spacing
        background: "#fff",           // ✅ Background color set
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // ✅ Shadow effect
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
            <img
              src="https://img.icons8.com/fluency/96/password.png"
              alt="Reset Password"
              style={{ maxWidth: "75%", marginTop: "20px" }}
            />
          </div>
          <div className="col-md-6 mt-4">
            {message && <p className="alert alert-info text-center">{message}</p>}

            <h3 className="fw-bold text-center mb-3">🔒 Reset Your Password</h3>
            <p className="text-muted text-center mb-3">Enter a new strong password</p>

            <form onSubmit={handleResetPassword}>
              <div className="mb-3 position-relative">
                <label className="form-label">New Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ borderColor: "#ff8c00", color: "#ff8c00", backgroundColor: "transparent" }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "lightyellow")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    {showPassword ? "👁️‍🗨️" : "🔒"}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-warning w-100 mt-2">🔐 Reset Password</button>
              <p className="mt-3 text-center small">
                Remember your password?{" "}
                <a href="/login" className="text-warning" onClick={(e) => {
                  e.preventDefault();
                  localStorage.setItem(
                    "flashMessage",
                    JSON.stringify({ type: "success", message: "✅ You can Login now!" })
                  );
                  window.location.href = "/login";
                }}>
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

export default ResetPassword;
