import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ["projects", "notes", "teaching", "other"] },

  // Fields for "projects" category
  projects: {
    subCategory: { type: String },
    requirements: { type: String },
    budget: { type: String },
    timeline: { type: String },
    audience: { type: String },
    designPreferences: { type: [String] },
    technicalSpecs: { type: String },
    competitorReferences: { type: String },
    keyContacts: { type: String },
  },

  // Fields for "notes" category
  notes: {
    selectedNoteType: { type: String },
    subject: { type: String }, // Only if selectedNoteType is "Other"
    requirements: { type: String },
    keyContacts: { type: String },
  },

  // Fields for "teaching" category
  teaching: {
    userType: { type: String },
    learningTopic: { type: String },
    message: { type: String },
    contact: { type: String },
  },

  // Fields for "other" category
  other: {
    requirements: { type: String },
    keyContacts: { type: String },
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;