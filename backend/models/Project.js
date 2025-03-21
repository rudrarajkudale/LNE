import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: String,
  liveDemoSrc: String,
  snapshotSrc: String,
  youtube: String,
  imgSrc: String,
  subject: String,
  type: String,
  downloadNotesSrc: String,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
