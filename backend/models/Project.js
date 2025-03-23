import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: String, required: true },
  liveDemoSrc: { type: String, required: true },
  snapshotSrc: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;