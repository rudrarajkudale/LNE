import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contactus.css";
import axios from "axios";


const CreatePost = () => {



  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    technologies: "",
    liveDemoSrc: "",
    snapshotSrc: "",
    youtube: "",
    imgSrc: "",
    subject: "",
    type: "",
    downloadNotesSrc: "",
  });

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setProjectDetails({
      title: "",
      description: "",
      technologies: "",
      liveDemoSrc: "",
      snapshotSrc: "",
      youtube: "",
      imgSrc: "",
      subject: "",
      type: "",
      downloadNotesSrc: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "projects") {
      const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      localStorage.setItem("projects", JSON.stringify([...savedProjects, projectDetails]));
      
      setShowMessage(true);
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    }
  };

  return (
    <div className="registerContainer" style={{ marginTop: "170px" }}>
      <div className="col-md-6">
        <h3 className="fw-bold text-center mb-2">Create a Post</h3>

        {showMessage && <div className="alert alert-success text-center">Successfully Created!</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="category" className="form-label">Select a Category</label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">-- Select an Option --</option>
              <option value="projects">Projects</option>
              <option value="teaching">Teaching</option>
              <option value="notes">Notes</option>
            </select>
          </div>

          {category === "projects" && (
            <>
              <div className="mb-2">
                <label htmlFor="title" className="form-label">Project Title</label>
                <input type="text" id="title" className="form-control" name="title" value={projectDetails.title} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className="form-control" name="description" rows="3" value={projectDetails.description} onChange={handleInputChange} required></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="technologies" className="form-label">Technologies</label>
                <input type="text" id="technologies" className="form-control" name="technologies" value={projectDetails.technologies} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <label htmlFor="imgSrc" className="form-label">Project Image</label>
                <input type="text" id="imgSrc" className="form-control" name="imgSrc" value={projectDetails.imgSrc} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <label htmlFor="snapshotSrc" className="form-label">Snapshot</label>
                <input type="text" id="snapshotSrc" className="form-control" name="snapshotSrc" value={projectDetails.snapshotSrc} onChange={handleInputChange} required />
              </div>
              <div className="mb-2">
                <label htmlFor="liveDemoSrc" className="form-label">Live Demo Link</label>
                <input type="text" id="liveDemoSrc" className="form-control" name="liveDemoSrc" value={projectDetails.liveDemoSrc} onChange={handleInputChange} required />
              </div>
            </>
          )}

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;