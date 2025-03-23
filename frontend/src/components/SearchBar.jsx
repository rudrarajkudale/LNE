import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <div className="search-bar-container">
      {/* Search Bar */}
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
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