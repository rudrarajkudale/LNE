import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Notes.css";

export default function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([
    {
      _id: "1",
      title: "React Basics",
      subject: "Web Development",
      description: "Introduction to React fundamentals.",
      tags: "React, JavaScript, Frontend",
      downloadLink: "#",
      premium: false,
      image: "https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg",
    },
    {
      _id: "2",
      title: "Data Structures",
      subject: "Computer Science",
      description: "Understanding Data Structures in depth.",
      tags: "DSA, Algorithms, Coding",
      downloadLink: "#",
      premium: true,
      image: "https://ik.imagekit.io/olibr/blogimages/Coverimag.webp",
    },
  ]);

  return (
    <div className="container position-relative py-4">
      {/* Search Bar & Buttons */}
      <br />
      <div className="d-flex justify-content-between align-items-center mb-4 search-container">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search Projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       <div>
        <button onClick={() => navigate('/contactus')} className="btn-primary-custom me-2">
          Grab Your Notes
        </button>
        <button onClick={() => setShowForm(true)} className="btn-primary-custom me-2">
          Create Notes
        </button>
        </div>
      </div>

      {/* Notes Display */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {notes
          .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((note) => (
            <div key={note._id} className="col">
              <div className={`card note-card ${note.premium ? "premium" : "free"}`}>
                <img src={note.image} alt={note.title} className="card-img-top note-image" />
                <div className="card-header text-white text-center" style={{ background: note.premium ? "red" : "green" }}>
                  {note.premium ? "Premium Notes" : "Free Notes"}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text"><strong>Subject:</strong> {note.subject}</p>
                  <p className="card-text">{note.description}</p>
                  <p className="card-text"><strong>Tags:</strong> {note.tags}</p>

                  {/* Conditional Button Rendering */}
                  {note.premium ? (
                    <a href="/buy" className="btn-buy">
                      Buy 
                    </a>
                  ) : (
                    <a href={note.downloadLink} className="btn-primary-custom me-2" download>
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
