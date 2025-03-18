import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Use token for API auth
        if (!token) return;

        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
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
            <div className="d-flex align-items-center">
              <span className="text-white fw-bold me-3">{user.fullName.split(" ")[0]}</span>
              <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="btn btn-outline-warning">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
