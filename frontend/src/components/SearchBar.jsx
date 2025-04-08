import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchBar.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const SearchBar = ({ onSearch, suggestions = [] }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

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
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
          { 
            headers: { "Authorization": `Bearer ${token}` },
            withCredentials: true 
          }
        );
        setUser(data.user);
        const adminIds = import.meta.env.VITE_ADMIN_IDS?.split(",") || [];
        if (data.user?.googleId && adminIds.includes(data.user.googleId)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
          setIsAdmin(false);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  const handleAdminAction = () => {
    if (!user) {
      toast.error('🔒 Please login to access admin features', {
        className: 'toast-custom-error',
        icon: false
      });
      navigate("/login");
      return;
    }
    navigate("/createpost");
  };

  const handleWantAction = () => {
    if (!user) {
      toast.error('🔒 Please login to access this feature', {
        className: 'toast-custom-error',
        icon: false
      });
      navigate("/login");
      return;
    }
    navigate("/contactus");
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        <input
          type="text"
          className={`search-input ${isFocused ? "focused" : ""}`}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />

        <div className="buttons-container">
          {isAdmin && (
            <button
              onClick={handleAdminAction}
              className="btn-create"
            >
              ADD
            </button>
          )}
          <button
            onClick={handleWantAction}
            className="btn-want"
          >
            I Want ...
          </button>
        </div>
      </div>

      {isFocused && searchQuery && (
        <div className="suggestions-box">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))
          ) : (
            <div className="no-suggestions">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;