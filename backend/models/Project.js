import mongoose from "mongoose"; // Import mongoose

const projectSchema = new mongoose.Schema({
  name: String,
  logo: String,
  description: String,
  technologies: [String],
  liveDemo: String,
  screenshots: [String],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
