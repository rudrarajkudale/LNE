import React, { useState } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import UserData from "./UserData";
import ContactsData from "./ContactsData";
import TeachingData from "./TeachingData";
import NotesData from "./NotesData";
import ProjectsData from "./ProjectsData";
import "./Admin.css";
import { FaCrown } from "react-icons/fa";

const Admin = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isBasePath = location.pathname === "/admin";

  return (
    <div className="admin-container">
      {isBasePath && <Navigate to="/admin/users" replace />}
      <div className="admin-navbar">
        <div 
          className={`hamburger ${isMenuOpen ? "active" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaCrown />
        </div>
        <ul className={`admin-nav ${isMenuOpen ? "active" : ""}`}>
          <li 
            className={location.pathname.includes("/admin/users") ? "active" : ""}
            onClick={closeMenu}
          >
            <Link to="/admin/users" className="admin-nav-link">Users</Link>
          </li>
          <li 
            className={location.pathname.includes("/admin/contacts") ? "active" : ""}
            onClick={closeMenu}
          >
            <Link to="/admin/contacts" className="admin-nav-link">Contacts</Link>
          </li>
          <li 
            className={location.pathname.includes("/admin/projects") ? "active" : ""}
            onClick={closeMenu}
          >
            <Link to="/admin/projects" className="admin-nav-link">Projects</Link>
          </li>
          <li 
            className={location.pathname.includes("/admin/teaching") ? "active" : ""}
            onClick={closeMenu}
          >
            <Link to="/admin/teaching" className="admin-nav-link">Teaching</Link>
          </li>
          <li 
            className={location.pathname.includes("/admin/notes") ? "active" : ""}
            onClick={closeMenu}
          >
            <Link to="/admin/notes" className="admin-nav-link">Notes</Link>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="/users" element={<UserData />} />
          <Route path="/contacts" element={<ContactsData />} />
          <Route path="/teaching" element={<TeachingData />} />
          <Route path="/notes" element={<NotesData />} />
          <Route path="/projects" element={<ProjectsData />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;