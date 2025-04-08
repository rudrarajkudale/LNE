import express from "express";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
import Notes from "../models/Notes.js";
import Project from "../models/Project.js";
import Teaching from "../models/Teaching.js";
import { isLoggedIn, isAdmin, validateNote, validateProject, validateTeaching } from "../middlewares.js";

const router = express.Router();

//user routes
router.get("/users", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password -resetPasswordToken -resetPasswordExpires -otp -otpExpires');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put("/users/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const { fullName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      console.log("User deleted");
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});


//Contacts Routes
router.get("/contacts", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.delete("/contacts/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.remove();
      res.json({ message: 'Contact removed' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
});

//notes Routes
router.put("/notes/:id", isLoggedIn, isAdmin, validateNote, async (req, res, next) => {
  try {
    const { title, description, imgSrc, downloadNotesSrc } = req.body;
    const note = await Notes.findById(req.params.id);
    if (note) {
      note.title = title || note.title;
      note.description = description || note.description;
      note.imgSrc = imgSrc || note.imgSrc;
      note.downloadNotesSrc = downloadNotesSrc || note.downloadNotesSrc;
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/notes/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const result = await Notes.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note removed' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid note ID format' });
    }
  }
});


//Porject routes
router.put("/projects/:id", isLoggedIn, isAdmin, validateProject, async (req, res, next) => {
  try {
    const { title, description, technologies, liveDemoSrc, snapshotSrc, imgSrc } = req.body;
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.technologies = technologies || project.technologies;
      project.liveDemoSrc = liveDemoSrc || project.liveDemoSrc;
      project.snapshotSrc = snapshotSrc || project.snapshotSrc;
      project.imgSrc = imgSrc || project.imgSrc;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/projects/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const result = await Project.deleteOne({ _id: req.params.id });   
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project removed' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
  }
});


//Teaching Routes
router.put("/teaching/:id", isLoggedIn, isAdmin, validateTeaching, async (req, res, next) => {
  try {
    const { title, description, youtube } = req.body;
    const teaching = await Teaching.findById(req.params.id);
    if (teaching) {
      teaching.title = title || teaching.title;
      teaching.description = description || teaching.description;
      teaching.youtube = youtube || teaching.youtube;
      const updatedTeaching = await teaching.save();
      res.json(updatedTeaching);
    } else {
      res.status(404).json({ message: 'Teaching not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/teaching/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const deletedTeaching = await Teaching.findByIdAndDelete(req.params.id);
    if (!deletedTeaching) {
      return res.status(404).json({ message: 'Teaching video not found' });
    }
    res.json({ message: 'Project removed' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid teaching ID format' });
    }
  }
});
export default router;