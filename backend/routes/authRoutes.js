import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL;

router.post("/register", async (req, res) => {
  const { fullName, email, password, reasonToJoin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword, reasonToJoin });

    await user.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error in /register route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user, redirect: FRONTEND_URL });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(FRONTEND_URL);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logout successful" });
  });
});

export default router;
