import React, { useEffect, useState } from "react";
import "../styles/Teaching.css";
import SearchBar from './SearchBar';

const Teaching = () => {
  const [teaching, setTeaching] = useState([]);
  const [filteredTeaching, setFilteredTeaching] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch teaching data from the database
  useEffect(() => {
    const fetchTeaching = async () => {
      try {
        const response = await fetch("/api/data/teaching");
        const data = await response.json();
        setTeaching(data);
        setFilteredTeaching(data); // Initialize filtered teaching data with all data
      } catch (error) {
        console.error("Error fetching teaching data:", error);
      }
    };

    fetchTeaching();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teaching.filter((item) => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredTeaching(filtered);
  };

  // Generate suggestions based on the search query
  const generateSuggestions = () => {
    if (searchQuery.length === 0) return [];
    const query = searchQuery.toLowerCase();

    const suggestions = teaching
      .flatMap((item) => {
        const matches = [];

        // Check title
        if (item.title.toLowerCase().includes(query)) {
          matches.push(`${item.title}`);
        }

        // Check description
        const descriptionWords = item.description.toLowerCase().split(" ");
        const matchedDescriptionWord = descriptionWords.find((word) =>
          word.includes(query)
        );
        if (matchedDescriptionWord) {
          matches.push(`${matchedDescriptionWord}`);
        }

        return matches;
      })
      .slice(0, 5); // Limit to 5 suggestions

    return suggestions;
  };

  const suggestions = generateSuggestions();

  return (
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} />

      {/* Display search suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-center mb-4">Teaching</h2>
      <div className="row">
        {filteredTeaching.length > 0 ? (
          filteredTeaching.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card project-card">
                <img
                  src={item.imgSrc}
                  className="card-img-top project-image"
                  alt={item.title}
                />
                <div className="card-body project-details">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>

                  {/* Buttons Section */}
                  <div className="d-flex justify-content-between mt-3">
                    <a
                      href={item.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn live-demo-btn"
                    >
                      📚 View Resource
                    </a>
                    <button className="btn snapshot-btn">📸 Snapshot</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No teaching resources found.</p>
        )}
      </div>
    </div>
  );
};

export default Teaching;