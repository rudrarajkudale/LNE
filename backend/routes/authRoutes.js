import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config(); // Load environment variables

const router = express.Router();
const { FRONTEND_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

if (!FRONTEND_URL || !JWT_SECRET || !EMAIL_USER || !EMAIL_PASS) {
  console.error("❌ Missing required environment variables. Check .env file.");
  process.exit(1);
}

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});


// Register Route
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
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed", error: err.message });
      res.json({ message: "Login successful", user, redirect: FRONTEND_URL });
    });
  })(req, res, next);
});

// Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(FRONTEND_URL);
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logout successful" });
  });
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  console.log("📌 Forgot Password Request Received:", req.body.email);

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      console.log("❌ Google-authenticated users cannot reset password:", email);
      return res.status(400).json({ message: "Google-authenticated users cannot reset password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    console.log("📩 Sending Email to:", email);
    console.log("🔗 Reset Link:", resetLink);

    await transporter.sendMail({
      from: `Last Night Engineering <${EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    console.log("✅ Email Sent Successfully to:", email);
    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("❌ Error Sending Email:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/reset-password", async (req, res) => {
  console.log("📌 Reset Password Request Received:", req.body);

  const { token, newPassword } = req.body;

  try {
    console.log("🔑 Verifying Token...");
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("❌ User Not Found:", decoded.id);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Compare new password with old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the old password" });
    }

    console.log("🔐 Hashing New Password...");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log("✅ Password Reset Successful");
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Error resetting password:", err.message);
    res.status(500).json({ message: "Invalid or expired token" });
  }
});

export default router;
