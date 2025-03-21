import express from "express";
import Project from "../models/Project.js"; // Ensure the file extension is .js

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save project" });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

export default router; // Use export default
