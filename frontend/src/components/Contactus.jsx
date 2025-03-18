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

  const projectOptions = ["E-commerce", "Full Stack", "Frontend Only", "Backend Only", "Other"];
  const teachingOptions = ["Frontend", "Backend", "MERN Stack", "Java", "Other"];
  const userTypes = ["Employee", "Student", "Other"];
  const timelineOptions = ["1 Month", "3 Months", "6 Months", "Flexible"];
  const designPreferencesOptions = ["Styling", "Branding", "User Experience", "Animations", "Minimalistic"];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="registerContainer">
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
                    <label className="form-label">Design Preference </label>
                    <select className="form-control" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
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
                      <option value="service">Service Based</option>
                      <option value="product">Product Based</option>
                    </select>
                  </div>
                
                  <div className="mb-2">
                    <label className="form-label">Technical Specifications</label>
                    <input type="text" className="form-control" name="technicalSpecs" value={projectDetails.technicalSpecs} onChange={handleProjectDetailsChange} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Contact  Details</label>
                    <input type="number" className="form-control" name="technicalSpecs" value={projectDetails.technicalSpecs} onChange={handleProjectDetailsChange} required />
                  </div>

                  
                </>
              )}
                {category === "notes" && (
                <> 
                <div className="mb-2">
                    <label className="form-label">What type of notes do you need?</label>
                    <select className="form-control" name="audience" value={projectDetails.audience} onChange={handleProjectDetailsChange} required>
                      <option value="">-- Select an Option --</option>
                      <option value="service">Frontend Notes</option>
                      <option value="product">Backend Notes</option>
                      <option value="product">MERN Stack Notes</option>
                      <option value="product">Other</option>

                    </select>
                  </div>
                
                  <div className="mb-2">
                    <label className="form-label">Additional Requirements</label>
                    <textarea className="form-control" name="requirements" rows="3" value={projectDetails.requirements} onChange={handleProjectDetailsChange} required></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Contact Details</label>
                    <input type="number" className="form-control" name="budget" value={projectDetails.budget} onChange={handleProjectDetailsChange} required />
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
                    <input type="number" className="form-control" name="budget" value={projectDetails.budget} onChange={handleProjectDetailsChange} required />
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
                    <label className="form-label">Contact  Details</label>
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