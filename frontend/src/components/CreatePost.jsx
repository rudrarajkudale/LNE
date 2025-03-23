import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contactus.css";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    // Reset form fields when category changes
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!category) {
      setErrorMessage("Please select a category.");
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post(`/api/data/${category}`, projectDetails);

      if (response.status === 201) {
        setShowMessage(true);
        setErrorMessage("");

        // Redirect to the category page after 1.5 seconds
        setTimeout(() => {
          navigate(`/${category}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="registerContainer" style={{ marginTop: "170px" }}>
      <div className="col-md-6">
        <h3 className="fw-bold text-center mb-2">Create a Post</h3>

        {/* Success message */}
        {showMessage && (
          <div className="alert alert-success text-center">Successfully Created!</div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Category selection */}
          <div className="mb-2">
            <label htmlFor="category" className="form-label">
              Select a Category
            </label>
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

          {/* Projects form fields */}
          {category === "projects" && (
            <>
              <div className="mb-2">
                <label htmlFor="title" className="form-label">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={projectDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  name="description"
                  rows="3"
                  value={projectDetails.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="technologies" className="form-label">
                  Technologies
                </label>
                <input
                  type="text"
                  id="technologies"
                  className="form-control"
                  name="technologies"
                  value={projectDetails.technologies}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="imgSrc" className="form-label">
                  Project Image
                </label>
                <input
                  type="text"
                  id="imgSrc"
                  className="form-control"
                  name="imgSrc"
                  value={projectDetails.imgSrc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="liveDemoSrc" className="form-label">
                  Live Demo Link
                </label>
                <input
                  type="text"
                  id="liveDemoSrc"
                  className="form-control"
                  name="liveDemoSrc"
                  value={projectDetails.liveDemoSrc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="snapshotSrc" className="form-label">
                  Snapshots Link
                </label>
                <input
                  type="text"
                  id="snapshotSrc"
                  className="form-control"
                  name="snapshotSrc"
                  value={projectDetails.snapshotSrc}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {/* Teaching form fields */}
          {category === "teaching" && (
            <>
              <div className="mb-2">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={projectDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  name="description"
                  rows="3"
                  value={projectDetails.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="youtube" className="form-label">
                  Video Link
                </label>
                <input
                  type="text"
                  id="youtube"
                  className="form-control"
                  name="youtube"
                  value={projectDetails.youtube}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {/* Notes form fields */}
          {category === "notes" && (
            <>
              <div className="mb-2">
                <label htmlFor="title" className="form-label">
                  Notes Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={projectDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  name="description"
                  rows="3"
                  value={projectDetails.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="imgSrc" className="form-label">
                  Notes Image
                </label>
                <input
                  type="text"
                  id="imgSrc"
                  className="form-control"
                  name="imgSrc"
                  value={projectDetails.imgSrc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="downloadNotesSrc" className="form-label">
                  Notes Link
                </label>
                <input
                  type="text"
                  id="downloadNotesSrc"
                  className="form-control"
                  name="downloadNotesSrc"
                  value={projectDetails.downloadNotesSrc}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {/* Submit button */}
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;