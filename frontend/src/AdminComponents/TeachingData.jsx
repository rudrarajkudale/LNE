import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeachingEdit from '../EditForm/TeachingEdit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const TeachingData = () => {
  const [teachings, setTeachings] = useState([]);
  const [editingTeaching, setEditingTeaching] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeachings, setFilteredTeachings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTeachings();
      await fetchUser();
    };
    fetchData();
  }, []);

  const fetchTeachings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/data/teaching`);
      setTeachings(response.data);
      setFilteredTeachings(response.data);
    } catch (error) {
      toast.error('❌ Failed to fetch teachings', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
        { 
          headers: { "Authorization": `Bearer ${token}` },
          withCredentials: true 
        }
      );
      setUser(userResponse.data.user);
      const adminIds = import.meta.env.VITE_ADMIN_IDS?.split(",") || [];
      setIsAdmin(!!(userResponse.data.user?.googleId && adminIds.includes(userResponse.data.user.googleId)));
    } catch (err) {
      toast.error('❌ Failed to verify user', {
        className: 'toast-custom-error',
        icon: false
      });
      setIsAdmin(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
  
    if (query === "") {
      setFilteredTeachings(teachings);
    } else {
      const filtered = teachings.filter(teaching =>
        teaching.title.toLowerCase().includes(lowerQuery) ||
        teaching.description.toLowerCase().includes(lowerQuery)
      );
      setFilteredTeachings(filtered);
    }
  };

  const handleDelete = async (teachingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/teaching/${teachingId}`,
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      setTeachings(prevTeachings => prevTeachings.filter(teaching => teaching._id !== teachingId));
      setFilteredTeachings(prevFiltered => prevFiltered.filter(teaching => teaching._id !== teachingId));
      toast.success('🗑️ Teaching deleted successfully!', {
        className: 'toast-custom',
        icon: false
      });
    } catch (err) {
      toast.error('❌ Failed to delete teaching', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const handleUpdateSuccess = () => {
    setEditingTeaching(null);
    setIsEditing(false);
    fetchTeachings(); 
  };

  const handleEditClick = (teaching) => {
    setEditingTeaching(teaching);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingTeaching(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="search-row">
        <Form.Control
          type="text"
          placeholder="Search teachings..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="admin-search-input"
        />
        {isAdmin && (
          <Button as={Link} to="/createpost" variant="primary" className="add-new-btn">
            Add New Teaching
          </Button>
        )}
      </div>

      <Table bordered hover responsive className="admin-table teaching-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>YouTube Link</th>
            {isAdmin && <th className="actions-column">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {(searchQuery ? filteredTeachings : teachings).length > 0 ? (
            (searchQuery ? filteredTeachings : teachings).map(teaching => (
              <tr key={teaching._id}>
                <td>{teaching.title}</td>
                <td>{teaching.description}</td>
                <td>
                  {teaching.youtube && (
                    <a
                      href={teaching.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-with-icon"
                    >
                      <FaExternalLinkAlt /> Watch on YouTube
                    </a>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <div className="action-buttons">
                      <Button
                        variant="link"
                        onClick={() => handleEditClick(teaching)}
                        aria-label="Edit teaching"
                        className="edit-btn"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(teaching._id)}
                        aria-label="Delete teaching"
                        className="delete-btn"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted py-4">
                {'No teaching content found'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {isEditing && editingTeaching && (
        <TeachingEdit
          teaching={editingTeaching}
          onSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default TeachingData;