import React from "react";
import { useNavigate } from "react-router-dom";



const SearchBarWithButtons = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div
      className="d-flex justify-content-between align-items-center p-3 rounded shadow-sm"
      style={{
        marginTop: "80px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
      }}
    >
      {/* Search Bar */}
      <input
        type="text"
        className="form-control w-50 me-3"
        placeholder="Search..."
        style={{
          borderRadius: "8px",
          border: "1px solid #ccc",
          padding: "12px",
        }}
      />

<div>
        <button onClick={() => navigate('/contactus')} className="btn-primary-custom me-2">
          Grab
        </button>
        <button onClick={() => navigate('/createpost')} className="btn-primary-custom me-2">
          Create 
        </button>
        </div>
    </div>
  );
};

export default SearchBarWithButtons;
