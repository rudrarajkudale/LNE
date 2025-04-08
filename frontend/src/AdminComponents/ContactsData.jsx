import React, { useState, useEffect } from 'react';
import { Table, Tab, Tabs, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactsData = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/contacts`,
          {
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            withCredentials: true
          }
        );
        setContacts(response.data);
        setFilteredContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast.error('❌ Failed to load contacts', {
          className: 'toast-custom-error',
          icon: false
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
  
    if (query === "") {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => {
        const requirements = contact[contact.category]?.requirements?.toLowerCase() || '';
        const matchesRequirements = requirements.includes(lowerQuery);
        
        if (contact.category === 'projects') {
          const subCategory = contact.projects?.subCategory?.toLowerCase() || '';
          const technicalSpecs = contact.projects?.technicalSpecs?.toLowerCase() || '';
          return (
            matchesRequirements ||
            subCategory.includes(lowerQuery) ||
            technicalSpecs.includes(lowerQuery)
          );
        }
        return matchesRequirements;
      });
      setFilteredContacts(filtered);
    }
  };

  const filterByCategory = (category) => {
    const filtered = (searchQuery ? filteredContacts : contacts).filter(contact => contact.category === category);
    return filtered;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderProjectsTable = () => {
    const projects = filterByCategory('projects');
    return (
      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th>Sub Category</th>
            <th>Requirements</th>
            <th>Budget</th>
            <th>Timeline</th>
            <th>Audience</th>
            <th>Design Preferences</th>
            <th>Technical Specs</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map(contact => (
              <tr key={contact._id}>
                <td>{contact.projects?.subCategory}</td>
                <td>{contact.projects?.requirements}</td>
                <td>{contact.projects?.budget}</td>
                <td>{contact.projects?.timeline}</td>
                <td>{contact.projects?.audience}</td>
                <td>
                  {Array.isArray(contact.projects?.designPreferences) 
                    ? contact.projects.designPreferences.map(pref => (
                        <Badge key={pref} className="tech-badge me-1">{pref}</Badge>
                      ))
                    : contact.projects?.designPreferences}
                </td>
                <td>{contact.projects?.technicalSpecs}</td>
                <td>{contact.projects?.keyContacts}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                {isLoading ? 'Loading projects...' : 'No project contacts found'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  const renderTeachingTable = () => {
    const teaching = filterByCategory('teaching');
    return (
      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th>User Type</th>
            <th>Learning Topic</th>
            <th>Message</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {teaching.length > 0 ? (
            teaching.map(contact => (
              <tr key={contact._id}>
                <td>{contact.teaching?.userType}</td>
                <td>{contact.teaching?.learningTopic}</td>
                <td>{contact.teaching?.message}</td>
                <td>{contact.teaching?.contact}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted py-4">
                {isLoading ? 'Loading teaching inquiries...' : 'No teaching inquiries found'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  const renderNotesTable = () => {
    const notes = filterByCategory('notes');
    return (
      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th>Note Type</th>
            <th>Subject</th>
            <th>Requirements</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {notes.length > 0 ? (
            notes.map(contact => (
              <tr key={contact._id}>
                <td>{contact.notes?.selectedNoteType}</td>
                <td>{contact.notes?.subject || 'N/A'}</td>
                <td>{contact.notes?.requirements}</td>
                <td>{contact.notes?.keyContacts}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted py-4">
                {isLoading ? 'Loading note requests...' : 'No note requests found'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="admin-container">
      <div className="search-row">
        <Form.Control
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="admin-search-input contact-search-input"
        />
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        className="mb-3 admin-tabs"
      >
        <Tab 
          eventKey="projects" 
          title={`Projects (${filterByCategory('projects').length})`}
          className="admin-tab"
          tabClassName="custom-tab"
          activeTabClassName="active-custom-tab"
        >
          {renderProjectsTable()}
        </Tab>
        <Tab 
          eventKey="teaching" 
          title={`Teaching (${filterByCategory('teaching').length})`}
          className="admin-tab"
          tabClassName="custom-tab"
          activeTabClassName="active-custom-tab"
        >
          {renderTeachingTable()}
        </Tab>
        <Tab 
          eventKey="notes" 
          title={`Notes (${filterByCategory('notes').length})`}
          className="admin-tab"
          tabClassName="custom-tab"
          activeTabClassName="active-custom-tab"
        >
          {renderNotesTable()}
        </Tab>
      </Tabs>
    </div>
  );
};

export default ContactsData;