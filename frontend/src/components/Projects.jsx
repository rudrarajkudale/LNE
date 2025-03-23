import React, { useEffect, useState } from "react";
import SearchBar from './SearchBar';
import "../styles/Projects.css"; // Import the CSS file

const Project = () => {
  const [projects, setProjects] = useState([]);

  // Fetch projects from the database
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/data/projects"); // Replace with your API endpoint
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" }); // Replace with your API endpoint
      fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="container mt-4">
      <SearchBar />

      <h2 className="text-center mb-4">Projects</h2>
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="col-md-4 mb-4">
              <div className="card project-card">
                <img
                  src={project.imgSrc}
                  className="card-img-top project-image"
                  alt={project.title}
                />
                <div className="card-body project-details">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>

                  {/* Tech Used Section */}
                  <div className="tech-used">
                    {project.technologies.split(',').map((tech, idx) => (
                      <span key={idx} className="tech-chip">{tech.trim()}</span>
                    ))}
                  </div>

                  {/* Buttons Section */}
                  <div className="d-flex justify-content-between mt-3">
                    <a
                      href={project.liveDemoSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn live-demo-btn"
                    >
                      🚀 Live Demo
                    </a>
                    <button className="btn snapshot-btn">📸 Snapshot</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(project._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Project;