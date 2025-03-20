import express from "express";
import Project from "../models/Project.js"; // Ensure you add `.js` in the import path

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new project
router.post("/", async (req, res) => {
  const { name, logo, description, technologies, liveDemo, screenshots } = req.body;

  try {
    const newProject = new Project({
      name,
      logo,
      description,
      technologies: technologies.split(","), // Ensure `technologies` is a string before splitting
      liveDemo,
      screenshots: Array.isArray(screenshots) ? screenshots : [screenshots], // Ensure `screenshots` is always an array
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
