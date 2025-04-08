import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CreatePost.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!category) {
      toast.error('⚠️ Please select a category before submitting.', {
        className: 'toast-custom-error',
        icon: false
      });
      setIsSubmitting(false);
      return;
    }
  
    try {
      let payload;
      switch (category) {
        case "projects":
          payload = {
            title: projectDetails.title,
            description: projectDetails.description,
            technologies: projectDetails.technologies,
            liveDemoSrc: projectDetails.liveDemoSrc,
            snapshotSrc: projectDetails.snapshotSrc,
            imgSrc: projectDetails.imgSrc
          };
          break;
        case "teaching":
          payload = {
            title: projectDetails.title,
            description: projectDetails.description,
            youtube: projectDetails.youtube
          };
          break;
        case "notes":
          payload = {
            title: projectDetails.title,
            description: projectDetails.description,
            imgSrc: projectDetails.imgSrc,
            downloadNotesSrc: projectDetails.downloadNotesSrc
          };
          break;
        default:
          setIsSubmitting(false);
          return;
      }
  
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/data/${category}`,
        payload,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
  
      if (response.status === 201) {
        toast.success(`🎉 ${category === "projects" ? "Project" : 
                     category === "teaching" ? "Teaching resource" : 
                     "Notes"} created successfully!`, {
          className: 'toast-custom',
          icon: false
        });
        setTimeout(() => {
          navigate(`/${category}`);
        }, 1500);
      }
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.error || "Failed to create post. Please try again later."}`, {
        className: 'toast-custom-error',
        icon: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="create-form-container">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="create-form-group">
          <label>Category:</label>
          <select
            className="create-form-input"
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
            <div className="create-form-group">
              <label>Project Title:</label>
              <input
                type="text"
                name="title"
                className="create-form-input"
                value={projectDetails.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Description:</label>
              <textarea
                name="description"
                className="create-form-input"
                value={projectDetails.description}
                onChange={handleInputChange}
                required
                rows={3}
              />
            </div>
            <div className="create-form-group">
              <label>Technologies:</label>
              <input
                type="text"
                name="technologies"
                className="create-form-input"
                value={projectDetails.technologies}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Project Image URL:</label>
              <input
                type="text"
                name="imgSrc"
                className="create-form-input"
                value={projectDetails.imgSrc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Live Demo Link:</label>
              <input
                type="text"
                name="liveDemoSrc"
                className="create-form-input"
                value={projectDetails.liveDemoSrc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Snapshots Link:</label>
              <input
                type="text"
                name="snapshotSrc"
                className="create-form-input"
                value={projectDetails.snapshotSrc}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {category === "teaching" && (
          <>
            <div className="create-form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                className="create-form-input"
                value={projectDetails.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Description:</label>
              <textarea
                name="description"
                className="create-form-input"
                value={projectDetails.description}
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>
            <div className="create-form-group">
              <label>Video Link:</label>
              <input
                type="text"
                name="youtube"
                className="create-form-input"
                value={projectDetails.youtube}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {category === "notes" && (
          <>
            <div className="create-form-group">
              <label>Notes Title:</label>
              <input
                type="text"
                name="title"
                className="create-form-input"
                value={projectDetails.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Description:</label>
              <textarea
                name="description"
                className="create-form-input"
                value={projectDetails.description}
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>
            <div className="create-form-group">
              <label>Notes Image URL:</label>
              <input
                type="text"
                name="imgSrc"
                className="create-form-input"
                value={projectDetails.imgSrc}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="create-form-group">
              <label>Download Link:</label>
              <input
                type="text"
                name="downloadNotesSrc"
                className="create-form-input"
                value={projectDetails.downloadNotesSrc}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        <div className="create-form-buttons">
          <button 
            type="submit" 
            className="create-form-save-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : '📤 Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;