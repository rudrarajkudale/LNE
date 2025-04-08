import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const ProjectEdit = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    imgSrc: '',
    liveDemoSrc: '',
    snapshotSrc: '',
    _id: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies || '',
        imgSrc: project.imgSrc || '',
        liveDemoSrc: project.liveDemoSrc || '',
        snapshotSrc: project.snapshotSrc || '',
        _id: project._id || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const updatedProject = { ...formData };
      
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects/${formData._id}`,
        updatedProject,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      toast.success('🚀 Project updated successfully!', {
        className: 'toast-custom',
        icon: false
      });

      onSuccess(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        '⚠️ Failed to update project. Please check your inputs and try again.';
      
      toast.error(
        error.response?.status === 401 
          ? '🔒 Session expired! Please login again to update projects.' 
          : `❌ ${errorMessage}`, 
        {
          className: 'toast-custom-error',
          icon: false
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="edit-form-group">
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="edit-form-group">
        <label>Description: </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>
      
      <div className="edit-form-group">
        <label>Technologies: </label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="edit-form-group">
        <label>Image URL: </label>
        <input
          type="url"
          name="imgSrc"
          value={formData.imgSrc}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="edit-form-group">
        <label>Live Demo URL: </label>
        <input
          type="url"
          name="liveDemoSrc"
          value={formData.liveDemoSrc}
          onChange={handleChange}
        />
      </div>
      
      <div className="edit-form-group">
        <label>Snapshots URL: </label>
        <input
          type="url"
          name="snapshotSrc"
          value={formData.snapshotSrc}
          onChange={handleChange}
        />
      </div>
      
      <div className="edit-form-buttons">
        <button 
          type="submit" 
          className="edit-form-save-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '💾 Saving...' : '💾 Save Project'}
        </button>
        <button 
          type="button" 
          className="edit-form-cancel-btn"
          onClick={() => {
            toast.info('✋ Edit cancelled - Project remains unchanged', {
              className: 'toast-custom-info',
              icon: false
            });
            onCancel();
          }}
          disabled={isSubmitting}
        >
          ⎋ Cancel
        </button>
      </div>
    </form>
  );
};

ProjectEdit.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    technologies: PropTypes.string,
    imgSrc: PropTypes.string,
    liveDemoSrc: PropTypes.string,
    snapshotSrc: PropTypes.string
  }),
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProjectEdit;
