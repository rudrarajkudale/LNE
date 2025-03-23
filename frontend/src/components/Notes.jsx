import React, { useEffect, useState } from "react";
import "../styles/Notes.css";
import SearchBar from './SearchBar';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notes from the database
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/data/notes");
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data); // Initialize filtered notes with all notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredNotes(filtered);
  };

  // Generate suggestions based on the search query
  const generateSuggestions = () => {
    if (searchQuery.length === 0) return [];
    const query = searchQuery.toLowerCase();

    const suggestions = notes
      .flatMap((note) => {
        const matches = [];

        // Check title
        if (note.title.toLowerCase().includes(query)) {
          matches.push(`${note.title}`);
        }

        // Check description
        const descriptionWords = note.description.toLowerCase().split(" ");
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

      <h2 className="text-center mb-4">Notes</h2>
      <div className="row">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card project-card">
                <img
                  src={note.imgSrc}
                  className="card-img-top project-image"
                  alt={note.title}
                />
                <div className="card-body project-details">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>

                  {/* Buttons Section */}
                  <div className="d-flex justify-content-between mt-3">
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn live-demo-btn"
                    >
                      📄 Download
                    </a>
                    <button className="btn snapshot-btn">📸 Snapshot</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Notes;