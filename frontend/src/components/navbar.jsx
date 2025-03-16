import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.png"; 

const Navbar = () => {
  const navigate = useNavigate();

  const LoginRoute = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="/">
          <img src={Logo} alt="Logo" width="100" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/projects">
                💡 Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/teaching">
                🧑‍🏫 Teaching
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/notes">
                📂 Notes
              </a>
            </li>
          </ul>

          <button onClick={LoginRoute} type="button" className="btn btn-outline-warning">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
