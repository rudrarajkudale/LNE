import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Projects.css";
import projects from "../data/projects";
import emsImg from '../assets/ems.png'

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);
  const navigate = useNavigate();

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container position-relative py-4">
      {/* Search Bar & Contact Button */}
      <div className="d-flex justify-content-between align-items-center position-sticky top-0 search-bar">
        <input
          type="text"
          placeholder="Search Projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control search-input"
        />
        <button onClick={() => navigate("/contactUs")} className="btn-primary-custom">
          Contact
        </button>
      </div>

      {/* Projects Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="col"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="card project-card">
              <div className="card-header">
                <img
                  src={project.logo}
                  alt={project.name}
                  className="project-logo"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
              </div>
              {hoveredProject === project.id && (
                <div className="card-footer project-footer">
                  <p><strong>Description:</strong> {project.description}</p>
                  <p><strong>Technologies:</strong></p>
                  <div className="tech-list">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn-secondary-custom"
                      onClick={() => window.open(project.liveDemo, "_blank")}
                    >
                      Visit
                    </button>
                    <button
                      className="btn-success-custom"
                      onClick={() => window.open(project.screenshots[0], "_blank")}
                    >
                      Snapshots
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
