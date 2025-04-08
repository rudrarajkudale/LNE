import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';
import './Form.css';

const UserEdit = ({ user, onSuccess, onCancel }) => {
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullName.trim() === user.fullName) {
      toast.info('👋 No changes detected', {
        className: 'toast-custom-info',
        icon: false
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${user._id}`,
        { fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success('👤 User updated successfully!', {
        className: 'toast-custom',
        icon: false
      });

      onSuccess(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      
      toast.error(errorMessage.includes('expired') ? 
        '🔒 Session expired! Please login again.' : 
        `❌ ${errorMessage}`, {
        className: 'toast-custom-error',
        icon: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    toast.info('👋 Edit cancelled - User remains unchanged', {
      className: 'toast-custom-info',
      icon: false
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="edit-form-group">
        <label>Full Name: </label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="edit-form-buttons">
        <button
          type="submit"
          className="edit-form-save-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '💾 Saving...' : '💾 Save Changes'}
        </button>
        <button
          type="button"
          className="edit-form-cancel-btn"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          ⎋ Cancel
        </button>
      </div>
    </form>
  );
};

UserEdit.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
  }),
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default UserEdit;