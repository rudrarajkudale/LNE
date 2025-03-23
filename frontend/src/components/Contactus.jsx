import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contactus.css";
import ContactImg from "../assets/contact.png";

const ContactForm = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [userType, setUserType] = useState("");
  const [learningTopic, setLearningTopic] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [selectedNoteType, setSelectedNoteType] = useState("");
  const [subject, setSubject] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    requirements: "",
    budget: "",
    timeline: "",
    audience: "",
    designPreferences: [],
    technicalSpecs: "",
    competitorReferences: "",
    keyContacts: "",
  });

  const projectOptions = ["E-commerce Website", "MERN Application", "Custom Software", "UI/UX Design", "Other"];
  const teachingOptions = ["MERN Development", "Full Stack Development", "Programming Language", "DSA", "Other"];
  const userTypes = ["Freelancer", "Startup", "Small Business", "Enterprise", "Student", "Other"];
  const timelineOptions = ["less than 1 month", "1 Month", "2 Months", "3 Months", "6 Months", "1 Year", "Flexible"];
  const designPreferencesOptions = ["Modern", "Minimalistic", "Corporate", "Creative", "User-Friendly", "Responsive Design", "Other"];
  const audienceOptions = ["General Public", "Business Professionals", "Students", "Tech Enthusiasts", "Other"];
  const noteTypes = ["Web Development Notes", "Programming Notes", "Engineering Notes", "DSA", "Other"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
    setProjectDetails({
      requirements: "",
      budget: "",
      timeline: "",
      audience: "",
      designPreferences: [],
      technicalSpecs: "",
      competitorReferences: "",
      keyContacts: "",
    });
    setUserType("");
    setLearningTopic("");
    setMessage("");
    setContact("");
    setSelectedNoteType("");
    setSubject("");
  };

  const handleProjectDetailsChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const handleDesignPreferenceChange = (e) => {
    const value = e.target.value;
    setProjectDetails((prev) => ({
      ...prev,
      designPreferences: prev.designPreferences.includes(value)
        ? prev.designPreferences.filter((pref) => pref !== value)
        : [...prev.designPreferences, value],
    }));
  };

  const handleNoteTypeChange = (e) => {
    setSelectedNoteType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formData = {};
  
    if (category === "projects") {
      formData = {
        category,
        subCategory,
        projectDetails: {
          requirements: projectDetails.requirements,
          budget: projectDetails.budget,
          timeline: projectDetails.timeline,
          audience: projectDetails.audience,
          designPreferences: projectDetails.designPreferences,
          technicalSpecs: projectDetails.technicalSpecs,
          keyContacts: projectDetails.keyContacts,
        },
      };
    } else if (category === "notes") {
      formData = {
        category,
        selectedNoteType,
        subject: selectedNoteType === "Other" ? subject : "",
        projectDetails: {
          requirements: projectDetails.requirements,
          keyContacts: projectDetails.keyContacts,
        },
      };
    } else if (category === "teaching") {
      formData = {
        category,
        userType,
        learningTopic,
        message,
        contact,
      };
    } else if (category === "other") {
      formData = {
        category,
        projectDetails: {
          requirements: projectDetails.requirements,
          keyContacts: projectDetails.keyContacts,
        },
      };
    }
  
    try {
      // Send the form data to the backend
      console.log("Sending form data...");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/LNE/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit form: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  return (
    <div className="registerContainer" style={{ marginTop: "170px" }}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
            <img src={ContactImg} alt="Contact Illustration" style={{ maxWidth: "75%" }} />
          </div>

          <div className="col-md-6">
            <h3 className="fw-bold text-center mb-2">Get in Touch</h3>
            <p className="text-muted text-center mb-2">We'd love to hear from you!</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Select a Category</label>
                <select className="form-control" value={category} onChange={handleCategoryChange} required>
                  <option value="">-- Select an Option --</option>
                  <option value="projects">Projects</option>
                  <option value="teaching">Teaching</option>
                  <option value="notes">Notes</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {category === "projects" && (
                <>
                  <div className="mb-2">
                    <label className="form-label">Which type of project?</label>
                    <select className="form-control" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
                      <option value="">-- Select an Option --</option>
                      {projectOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Project Requirements</label>
                    <textarea className="form-control" name="requirements" rows="3" value={projectDetails.requirements} onChange={handleProjectDetailsChange} required></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Budget</label>
                    <input type="text" className="form-control" name="budget" value={projectDetails.budget} onChange={handleProjectDetailsChange} required />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Design Preference</label>
                    <select className="form-control" name="designPreferences" value={projectDetails.designPreferences} onChange={handleDesignPreferenceChange} required>
                      <option value="">-- Select an Option --</option>
                      {designPreferencesOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Timeline</label>
                    <select className="form-control" name="timeline" value={projectDetails.timeline} onChange={handleProjectDetailsChange} required>
                      <option value="">-- Select Timeline --</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Audience</label>
                    <select className="form-control" name="audience" value={projectDetails.audience} onChange={handleProjectDetailsChange} required>
                      <option value="">-- Select an Option --</option>
                      {audienceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Technical Specifications</label>
                    <input type="text" className="form-control" name="technicalSpecs" value={projectDetails.technicalSpecs} onChange={handleProjectDetailsChange} required />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Contact Details</label>
                    <input type="number" className="form-control" name="keyContacts" value={projectDetails.keyContacts} onChange={handleProjectDetailsChange} required />
                  </div>
                </>
              )}

              {category === "notes" && (
                <>
                  <div className="mb-2">
                    <label className="form-label">What type of notes do you need?</label>
                    <select
                      className="form-control"
                      value={selectedNoteType}
                      onChange={handleNoteTypeChange}
                      required
                    >
                      <option value="">-- Select an Option --</option>
                      {noteTypes.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {selectedNoteType === "Other" && (
                    <div className="mb-2">
                      <label className="form-label">Enter Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-2">
                    <label className="form-label">Additional Requirements</label>
                    <textarea
                      className="form-control"
                      name="requirements"
                      rows="3"
                      value={projectDetails.requirements}
                      onChange={handleProjectDetailsChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Contact Details</label>
                    <input
                      type="number"
                      className="form-control"
                      name="keyContacts"
                      value={projectDetails.keyContacts}
                      onChange={handleProjectDetailsChange}
                      required
                    />
                  </div>
                </>
              )}

              {category === "other" && (
                <>
                  <div className="mb-2">
                    <label className="form-label">Requirements</label>
                    <textarea className="form-control" name="requirements" rows="3" value={projectDetails.requirements} onChange={handleProjectDetailsChange} required></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Contact Details</label>
                    <input type="number" className="form-control" name="keyContacts" value={projectDetails.keyContacts} onChange={handleProjectDetailsChange} required />
                  </div>
                </>
              )}

              {category === "teaching" && (
                <>
                  <div className="mb-2">
                    <label className="form-label">Who are you?</label>
                    <select className="form-control" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                      <option value="">-- Select an Option --</option>
                      {userTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">What do you want to learn?</label>
                    <select className="form-control" value={learningTopic} onChange={(e) => setLearningTopic(e.target.value)} required>
                      <option value="">-- Select an Option --</option>
                      {teachingOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="2" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Contact Details</label>
                    <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
                  </div>
                </>
              )}

              <button className="btn btn-orange w-100 mb-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;