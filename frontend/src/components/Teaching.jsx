import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaYoutube, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import TeachingEdit from '../EditForm/TeachingEdit';
import '../styles/Main.css';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Tostify.css';

const Teachings = () => {
  const [teachings, setTeachings] = useState([]);
  const [editingTeaching, setEditingTeaching] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachings, setFilteredTeachings] = useState([]);
  const [showDescriptions, setShowDescriptions] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTeachings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/data/teaching`);
        setTeachings(res.data);
        setFilteredTeachings(res.data);
        const initialState = {};
        res.data.forEach(t => initialState[t._id] = false);
        setShowDescriptions(initialState);
      } catch (err) {
        toast.error('❌ Failed to fetch teachings', {
          className: 'toast-custom-error',
          icon: false
        });
      }
    };

    const fetchUser = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
          {
            headers: { "Authorization": `Bearer ${token}` },
            withCredentials: true
          }
        );
        setUser(userRes.data.user);
        const adminIds = import.meta.env.VITE_ADMIN_IDS?.split(",") || [];
        setIsAdmin(!!(userRes.data.user?.googleId && adminIds.includes(userRes.data.user.googleId)));
      } catch (err) {
        setUser(null);
        setIsAdmin(false);
      }
    };

    fetchTeachings();
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/teaching/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      setTeachings(prev => prev.filter(t => t._id !== id));
      setFilteredTeachings(prev => prev.filter(t => t._id !== id));
      toast.success('🗑️ Teaching video deleted successfully!', {
        className: 'toast-custom',
        icon: false
      });
    } catch (err) {
      toast.error('❌ Failed to delete teaching video', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const handleUpdate = async (updatedTeaching) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/teaching/${updatedTeaching._id}`,
        updatedTeaching,
        {
          headers: { "Authorization": `Bearer ${token}` },
          withCredentials: true
        }
      );
      setTeachings(prev => prev.map(t => t._id === data._id ? data : t));
      setFilteredTeachings(prev => prev.map(t => t._id === data._id ? data : t));
      setEditingTeaching(null);
      setIsEditing(false);
      toast.success('✅ Teaching video updated successfully!', {
        className: 'toast-custom',
        icon: false
      });
    } catch (err) {
      toast.error('❌ Failed to update teaching video', {
        className: 'toast-custom-error',
        icon: false
      });
    }
  };

  const handleEditClick = (teaching) => {
    setEditingTeaching(teaching);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingTeaching(null);
    setIsEditing(false);
  };

  const toggleDescription = (id) => {
    setShowDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teachings.filter(t => {
      const title = t.title?.toLowerCase() || '';
      const subject = t.subject?.toLowerCase() || '';
      const description = t.description?.toLowerCase() || '';
      const queryLower = query.toLowerCase();
      return (
        title.includes(queryLower) ||
        subject.includes(queryLower) ||
        description.includes(queryLower)
      );
    });
    setFilteredTeachings(filtered);
  };

  const generateSuggestions = () => {
    if (searchQuery.length === 0) return [];
    const query = searchQuery.toLowerCase();
    const suggestions = teachings
      .flatMap((t) => {
        const matches = [];
        const title = t.title?.toLowerCase() || '';
        const subject = t.subject?.toLowerCase() || '';
        const description = t.description?.toLowerCase() || '';
        if (title.includes(query)) matches.push(t.title);
        if (subject.includes(query)) matches.push(t.subject);
        const descWords = description.split(" ");
        const matchedWord = descWords.find(word => word.includes(query));
        if (matchedWord) matches.push(matchedWord);
        return matches;
      })
      .slice(0, 5);
    return [...new Set(suggestions)];
  };

  const suggestions = generateSuggestions();

  const getYouTubeThumbnail = (url) => {
    const videoIdMatch = url?.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  return (
    <div className="section-container">
      <SearchBar onSearch={handleSearch} suggestions={suggestions} />

      <div className="section-grid section-grid-yt">
        {(searchQuery ? filteredTeachings : teachings).map((t) => (
          <div key={t._id} className="section-card-yt section-card">
            <div className="section-admin-actions">
              {isAdmin && (
                <>
                  <button onClick={() => handleEditClick(t)} aria-label="Edit teaching">
                    <FaEdit className="section-icon section-edit-btn" />
                  </button>
                  <button onClick={() => handleDelete(t._id)} aria-label="Delete teaching">
                    <FaTrash className="section-icon section-del-btn" />
                  </button>
                </>
              )}
              <button onClick={() => toggleDescription(t._id)} aria-label="Show description">
                <FaInfoCircle className="section-icon section-info-btn" />
              </button>
            </div>

            <div className="section-card-image">
              {t.youtube ? (
                <img
                  src={getYouTubeThumbnail(t.youtube)}
                  alt={`YouTube thumbnail for ${t.title}`}
                  loading="lazy"
                />
              ) : (
                <div className="section-image-placeholder">
                  <FaYoutube className="section-placeholder-icon" />
                  <h3>{t.title}</h3>
                </div>
              )}
            </div>

            <div className="section-card-overlay">
              <div className="section-card-details">
                {!showDescriptions[t._id] ? (
                  <>
                    <h3>{t.title}</h3>
                    <div className="section-card-actions">
                      {t.youtube && (
                        <a
                          href={t.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="section-action-btn"
                        >
                          <FaYoutube className="section-icon" /> Watch
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="section-description">
                    <p>{t.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && editingTeaching && (
        <div className="section-edit-modal">
          <TeachingEdit
            teaching={editingTeaching}
            onSuccess={handleUpdate}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Teachings;