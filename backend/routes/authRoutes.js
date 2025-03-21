import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();
const { FRONTEND_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

if (!FRONTEND_URL || !JWT_SECRET || !EMAIL_USER || !EMAIL_PASS) {
  console.error("❌ Missing required environment variables. Check .env file.");
  process.exit(1);
}

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  tls: { rejectUnauthorized: false },
});

// Store OTPs temporarily
const otpStorage = new Map();

// **🔹 Send OTP**
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage.set(email, otp);

    await transporter.sendMail({
      from: `Last Night Engineering <${EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// **🔹 Verify OTP**
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!otpStorage.has(email) || otpStorage.get(email) !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  otpStorage.delete(email);
  res.json({ message: "OTP verified successfully" });
});

// **🔹 Register & Merge Google Login**
router.post("/register", async (req, res) => {
  const { fullName, email, password, reasonToJoin } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.fullName = fullName || user.fullName;
        user.reasonToJoin = reasonToJoin || user.reasonToJoin;
        await user.save();
        return res.json({ message: "Google account merged with manual signup" });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword, reasonToJoin });
    await user.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// **🔹 Login**
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

// **🔹 Google Authentication**
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        user = new User({
          fullName: req.user.displayName,
          email: req.user.email,
          googleId: req.user.id,
        });
      } else if (!user.googleId) {
        user.googleId = req.user.id;
      }

      await user.save();
      res.redirect(FRONTEND_URL);
    } catch (err) {
      res.status(500).json({ message: "Google authentication failed", error: err.message });
    }
  }
);

// **🔹 Logout**
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logout successful" });
  });
});

// **🔹 Forgot Password**
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.password) return res.status(400).json({ message: "Google-authenticated users cannot reset password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `Last Night Engineering <${EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// **🔹 Reset Password**
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) return res.status(400).json({ message: "New password cannot be the same as the old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
});

export default router;
