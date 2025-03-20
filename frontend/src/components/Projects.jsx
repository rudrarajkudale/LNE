import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Projects.css";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" }); // Flash message state

  const [newProject, setNewProject] = useState({
    name: "",
    logo: "",
    description: "",
    technologies: "",
    liveDemo: "",
    screenshots: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add project");
        }
        return res.json();
      })
      .then((data) => {
        setProjects([...projects, data]);
        setShowForm(false);
        setNewProject({
          name: "",
          logo: "",
          description: "",
          technologies: "",
          liveDemo: "",
          screenshots: "",
        });

        // Show success message
        setFlashMessage({ message: "Project added successfully!", type: "success" });

        // Hide message after 3 seconds
        setTimeout(() => setFlashMessage({ message: "", type: "" }), 3000);
      })
      .catch((err) => {
        console.error("Error adding project:", err);

        // Show error message
        setFlashMessage({ message: "Failed to add project!", type: "error" });

        // Hide message after 3 seconds
        setTimeout(() => setFlashMessage({ message: "", type: "" }), 3000);
      });
  };

  // Open Confirmation Modal
  const handleCancel = () => {
    setShowConfirm(true);
  };

  // Close Form if "Yes" is clicked
  const confirmCancel = () => {
    setShowForm(false);
    setShowConfirm(false);
  };

  return (
    <div className="container position-relative py-4">
      {/* Flash Message */}
      {flashMessage.message && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.message}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center position-sticky top-0 search-bar">
        <input
          type="text"
          placeholder="Search Projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control search-input"
        />
        <button onClick={() => setShowForm(true)} className="btn-primary-custom me-2">
          Create Project
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {projects
          .filter((project) =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((project) => (
            <div key={project._id} className="col">
              <div className="card project-card">
                <div className="card-header">
                  <img src={project.logo} alt={project.name} className="project-logo" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Form for adding new projects */}
      {showForm && (
        <div className="project-form-overlay">
          <div className="project-form">
            <h3 className="text-center">Create New Project</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProject.logo}
                onChange={(e) =>
                  setNewProject({ ...newProject, logo: e.target.value })
                }
                required
                className="form-control mb-2"
              />
              <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={newProject.technologies}
                onChange={(e) =>
                  setNewProject({ ...newProject, technologies: e.target.value })
                }
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Live Demo URL"
                value={newProject.liveDemo}
                onChange={(e) =>
                  setNewProject({ ...newProject, liveDemo: e.target.value })
                }
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder="Snapshot URL"
                value={newProject.screenshots}
                onChange={(e) =>
                  setNewProject({ ...newProject, screenshots: e.target.value })
                }
                required
                className="form-control mb-3"
              />

              {/* Buttons: Add & Cancel */}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  Add Project
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline-danger"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-content">
            <h4>Are you sure you want to cancel?</h4>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={confirmCancel}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
