import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="search-bar-container">
      {/* Search Bar */}
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
      />

      {/* Buttons */}
      <div className="buttons-container">
        <button
          onClick={() => navigate("/contactus")}
          className="btn btn-want"
        >
          Want
        </button>
        <button
          onClick={() => navigate("/createpost")}
          className="btn btn-create"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default SearchBar;