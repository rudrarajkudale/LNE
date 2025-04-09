import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import Logo from "../assets/Logo.png";
import { FaBars, FaKey, FaSignOutAlt, FaCrown } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/projects')) setActiveTab('projects');
    else if (path.includes('/teaching')) setActiveTab('teaching');
    else if (path.includes('/notes')) setActiveTab('notes');
    else if (path.includes('/admin')) setActiveTab('admin');
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        setUser(null);
        setIsAdmin(false);
        return;
      }
    
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
          headers: { "Authorization": `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(data.user);
        const adminIds = import.meta.env.VITE_ADMIN_IDS?.split(',') || [];
        if (data.user?.googleId && adminIds.includes(data.user.googleId)) {
          setIsAdmin(true);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          setUser(null);
          setIsAdmin(false);
        }
      }
    };
    
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        headers: { "Authorization": `Bearer ${token}` },
        withCredentials: true,
      });
  
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      setUser(null);
      setIsAdmin(false);
      
      toast.success('😊 Logged out successfully!', {
        className: 'toast-custom',
        icon: false
      });
      
      navigate('/');
    } catch (error) {
      toast.error('❌ Failed to logout', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const handleChangePassword = () => {
    if (!user) {
      toast.error('🔒 Please login to change password', {
        className: 'toast-custom-error',
        icon: false
      });
      navigate("/login");
      return;
    }
    navigate("/forgot-password");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
      <ToastContainer position="top-center" autoClose={2000}/>
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          <img src={Logo} alt="Logo" width="100" />
        </Link>

        <span 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <FaBars />
        </span>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link text-white ${activeTab === 'projects' ? 'active' : ''}`} 
                to="/projects"
                onClick={() => setActiveTab('projects')}
              >
                💡 Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link text-white ${activeTab === 'teaching' ? 'active' : ''}`} 
                to="/teaching"
                onClick={() => setActiveTab('teaching')}
              >
                🧑‍🏫 Teaching
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link text-white ${activeTab === 'notes' ? 'active' : ''}`} 
                to="/notes"
                onClick={() => setActiveTab('notes')}
              >
                📂 Notes
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <ul className="navbar-nav me-auto admin-btn">
                    <li className="nav-item">
                      <Link 
                        className={`nav-link text-white ${activeTab === 'admin' ? 'active' : ''}`} 
                        to="/admin"
                        onClick={() => setActiveTab('admin')}
                      >
                        <FaCrown className="me-1" /> Admin
                      </Link>
                    </li>
                  </ul>
                )}
                
                <div className="desktop-user-dropdown">
                  <div className="position-relative user-dropdown">
                    <span
                      className="user-name"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setShowDropdown(!showDropdown);
                      }}
                    >
                      {user.fullName.split(" ")[0]}
                    </span>
                    {showDropdown && (
                      <div
                        className="dropdown-menu show"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        <button
                          className="dropdown-item change-password"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChangePassword();
                            setShowDropdown(false);
                          }}
                        >
                          <FaKey className="me-2" /> Change Password
                        </button>
                        <button
                          className="dropdown-item logout"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLogout();
                            setShowDropdown(false);
                          }}
                        >
                          <FaSignOutAlt className="me-2" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mobile-user-actions">
                  <button
                    className="mobile-action-btn change-password"
                    onClick={handleChangePassword}
                  >
                    <FaKey className="me-2" /> Change Password
                  </button>
                  <button
                    className="mobile-action-btn logout"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;