import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "../styles/Projects.css"; // Import the CSS file

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch projects from the database
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/data/projects"); // Replace with your API endpoint
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data); // Initialize filtered projects with all projects
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
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
      setFilteredProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = projects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.technologies.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredProjects(filtered);
  };

  // Generate suggestions based on the search query
  const generateSuggestions = () => {
    if (searchQuery.length === 0) return [];
    const query = searchQuery.toLowerCase();

    const suggestions = projects
      .flatMap((project) => {
        const matches = [];

        // Check title
        if (project.title.toLowerCase().includes(query)) {
          matches.push(`${project.title}`);
        }

        // Check description
        const descriptionWords = project.description.toLowerCase().split(" ");
        const matchedDescriptionWord = descriptionWords.find((word) =>
          word.includes(query)
        );
        if (matchedDescriptionWord) {
          matches.push(`${matchedDescriptionWord}`);
        }

        // Check technologies
        const technologies = project.technologies.toLowerCase().split(",");
        const matchedTechnology = technologies.find((tech) =>
          tech.trim().includes(query)
        );
        if (matchedTechnology) {
          matches.push(`${matchedTechnology.trim()}`);
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

      <h2 className="text-center mb-4">Projects</h2>
      <div className="row">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
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
                    {project.technologies.split(",").map((tech, idx) => (
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