import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import UserEdit from '../EditForm/UserEdit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const UsersData = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchCurrentUser();
    };
    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        { 
          headers: { "Authorization": `Bearer ${token}` },
          withCredentials: true 
        }
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      toast.error('❌ Failed to fetch users', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
        { 
          headers: { "Authorization": `Bearer ${token}` },
          withCredentials: true 
        }
      );
      setCurrentUser(userResponse.data.user);
      const adminIds = import.meta.env.VITE_ADMIN_IDS?.split(",") || [];
      setIsAdmin(!!(userResponse.data.user?.googleId && adminIds.includes(userResponse.data.user.googleId)));
    } catch (err) {
      toast.error('❌ Failed to verify user', {
        className: 'toast-custom-error',
        icon: false
      });
      setCurrentUser(null);
      setIsAdmin(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
  
    if (query === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.fullName.toLowerCase().includes(lowerQuery) ||
        (user.email && user.email.toLowerCase().includes(lowerQuery)) ||
        (user.reasonToJoin && user.reasonToJoin.toLowerCase().includes(lowerQuery))
      );
      setFilteredUsers(filtered);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      setFilteredUsers(prevFiltered => prevFiltered.filter(user => user._id !== userId));
      toast.success('🗑️ User deleted successfully!', {
        className: 'toast-custom',
        icon: false
      });
    } catch (err) {
      toast.error('❌ Failed to delete user', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const handleUpdateSuccess = (updatedUser) => {
    setUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u));
    setFilteredUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u));
    setEditingUser(null);
    setIsEditing(false);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="search-row">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="admin-search-input"
        />
      </div>

      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Reason to Join</th>
            {isAdmin && <th className="actions-column">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {(searchQuery ? filteredUsers : users).length > 0 ? (
            (searchQuery ? filteredUsers : users).map(user => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.reasonToJoin}</td>
                {isAdmin && (
                  <td>
                    <div className="action-buttons">
                      <Button
                        variant="link"
                        onClick={() => handleEditClick(user)}
                        aria-label="Edit user"
                        className="edit-btn"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(user._id)}
                        aria-label="Delete user"
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
                {'No user found'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {isEditing && editingUser && (
        <UserEdit
          user={editingUser}
          onSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
          show={isEditing}
        />
      )}
    </div>
  );
};

export default UsersData;