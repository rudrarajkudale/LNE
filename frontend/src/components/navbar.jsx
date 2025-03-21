import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.png";
import FlashMsg from "../utils/FlashMsg";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const storedMessage = localStorage.getItem("flashMessage");
    if (storedMessage) {
      const { type, message } = JSON.parse(storedMessage);
      setFlashMessage({ type, message });
      localStorage.removeItem("flashMessage");
      setTimeout(() => setFlashMessage(null), 3000);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangePassword = () => {
    navigate("/forgot-password");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="/">
          <img src={Logo} alt="Logo" width="100" />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link text-white" href="/projects">💡 Projects</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/teaching">🧑‍🏫 Teaching</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/notes">📂 Notes</a></li>
          </ul>

          {user ? (
            <div className="d-flex align-items-center position-relative">
              <span
                className="text-black fw-bold me-3 cursor-pointer nav-link"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#ff8c00")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.fullName.split(" ")[0]}
              </span>
              {showDropdown && (
                <div
                  className="dropdown-menu show position-absolute mt-2"
                  style={{
                    top: "100%",
                    right: "0",
                    border: "1px solid #ff8c00",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#fff",
                  }}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button
                    className="dropdown-item"
                    style={{ color: "blue" }}
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                  <button
                    className="dropdown-item"
                    style={{ color: "red" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="btn btn-outline-warning">Login</button>
          )}
        </div>
      </div>

      {flashMessage && <FlashMsg message={flashMessage.message} type={flashMessage.type} onClose={() => setFlashMessage(null)} />}
    </nav>
  );
};

export default Navbar;