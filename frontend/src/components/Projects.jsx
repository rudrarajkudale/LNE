import { useEffect, useState } from "react";
import SearchBarWithButtons from '../components/SearchBarWithButtons';

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="container mt-4">
      <SearchBarWithButtons />

      <h2 className="text-center mb-4">Projects</h2>
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="col-md-4">
              <div className="card project-card">
                <img src={project.imgSrc} className="card-img-top project-image" alt={project.title} />
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
                    {project.liveDemoSrc && (
                      <a href={project.liveDemoSrc} target="_blank" rel="noopener noreferrer" className="btn live-demo-btn">🚀 Live Demo</a>
                    )}
                    <button className="btn snapshot-btn">📸 Snapshot</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No projects found.</p>
        )}
      </div>

      <style>
        {`
          .project-card {
            position: relative;
            overflow: hidden;
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease-in-out;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }

          .project-card:hover {
            transform: scale(1.02);
          }

          .project-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease-in-out;
            border-radius: 10px;
          }

          .project-card:hover .project-image {
            transform: scale(1.1);
          }

          .project-details {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 15px;
            opacity: 0;
            transform: translateY(100%);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            border-radius: 0 0 10px 10px;
          }

          .project-card:hover .project-details {
            opacity: 1;
            transform: translateY(0);
          }

          /* Tech Used Styling */
          .tech-used {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .tech-chip {
            background: #17a2b8;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
          }

          /* Buttons Styling */
          .btn {
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s ease-in-out;
          }

          .live-demo-btn {
            background-color: #28a745;
            color: white;
          }

          .live-demo-btn:hover {
            background-color: #218838;
          }

          .snapshot-btn {
            background-color: #ffc107;
            color: black;
          }

          .snapshot-btn:hover {
            background-color: #e0a800;
          }
        `}
      </style>
    </div>
  );
};

export default Project;
