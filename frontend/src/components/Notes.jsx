import React, { useEffect, useState } from "react";
import "../styles/Notes.css";
import SearchBar from './SearchBar';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/data/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="container mt-4">
      <SearchBar />
      <h2 className="text-center mb-4">Notes</h2>
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note, index) => (
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