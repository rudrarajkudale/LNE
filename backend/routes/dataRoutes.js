import express from "express";
import Project from "../models/Project.js";
import Teaching from "../models/Teaching.js";
import Note from "../models/Notes.js";

const router = express.Router();

// Create a post (projects, teaching, or notes)
router.post("/:category", async (req, res) => {
  const { category } = req.params;
  const data = req.body;

  try {
    let newData;
    switch (category) {
      case "projects":
        newData = new Project(data);
        break;
      case "teaching":
        newData = new Teaching(data);
        break;
      case "notes":
        newData = new Note(data);
        break;
      default:
        return res.status(400).json({ error: "Invalid category" });
    }

    await newData.save();
    res.status(201).json({ message: `${category} created successfully`, data: newData });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post", details: error.message });
  }
});

// Get all posts for a category
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  try {
    let data;
    switch (category) {
      case "projects":
        data = await Project.find();
        break;
      case "teaching":
        data = await Teaching.find();
        break;
      case "notes":
        data = await Note.find();
        break;
      default:
        return res.status(400).json({ error: "Invalid category" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
});

export default router;