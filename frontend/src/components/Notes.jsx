import React, { useState } from "react";
import "../styles/Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  const handleAddNote = () => {
    if (note.trim() !== "") {
      setNotes([...notes, note]);
      setNote("");
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <h1>My Notes</h1>
      <div className="notes-input">
        <input
          type="text"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleAddNote}>Add</button>
      </div>
      <ul className="notes-list">
        {notes.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDeleteNote(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
