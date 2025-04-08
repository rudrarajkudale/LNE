import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoteEdit from '../EditForm/NoteEdit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const NotesData = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNotes();
      await fetchUser();
    };
    fetchData();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/data/notes`);
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      toast.error('❌ Failed to fetch notes', {
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
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.description.toLowerCase().includes(lowerQuery)
      );
      setFilteredNotes(filtered);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/notes/${noteId}`,
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
      setFilteredNotes(prevFiltered => prevFiltered.filter(note => note._id !== noteId));
      toast.success('🗑️ Note deleted successfully!', {
        className: 'toast-custom',
        icon: false
      });
    } catch (err) {
      toast.error('❌ Failed to delete note', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const handleUpdateSuccess = () => {
    setEditingNote(null);
    setIsEditing(false);
    fetchNotes(); 
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="search-row">
        <Form.Control
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="admin-search-input"
        />
        {isAdmin && (
          <Button as={Link} to="/createpost" variant="primary" className="add-new-btn">
            Add New Note
          </Button>
        )}
      </div>

      <Table bordered hover responsive className="admin-table notes-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Preview</th>
            <th>Download</th>
            {isAdmin && <th className="actions-column">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {(searchQuery ? filteredNotes : notes).length > 0 ? (
            (searchQuery ? filteredNotes : notes).map(note => (
              <tr key={note._id}>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td>
                  {note.imgSrc && (
                    <a
                      href={note.imgSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-with-icon"
                    >
                      <FaExternalLinkAlt /> Preview
                    </a>
                  )}
                </td>
                <td>
                  {note.downloadNotesSrc && (
                    <a
                      href={note.downloadNotesSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-with-icon"
                    >
                      <FaDownload /> Download
                    </a>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <div className="action-buttons">
                      <Button
                        variant="link"
                        onClick={() => handleEditClick(note)}
                        aria-label="Edit note"
                        className="edit-btn"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(note._id)}
                        aria-label="Delete note"
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
              <td colSpan="5" className="text-center text-muted py-4">
                {'No notes available'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {isEditing && editingNote && (
        <NoteEdit
          note={editingNote}
          onSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default NotesData;