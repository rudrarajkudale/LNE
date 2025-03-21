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
        // If user registered via Google before, add password for manual login
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.fullName = fullName || user.fullName;
        user.reasonToJoin = reasonToJoin || user.reasonToJoin;
        await user.save();
        return res.json({ message: "Google account merged with manual signup" });
      }
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // New manual registration
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

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: "Login successful", user, redirect: process.env.FRONTEND_URL });
    });
  })(req, res, next);
});


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      console.log("User object from Google callback:", req.user);

      // Find the user by email
      let user = await User.findOne({ email: req.user.email });

      if (user) {
        // If user exists but does not have a Google ID, update it
        if (!user.googleId) {
          user.googleId = req.user.id;
          await user.save();
        }
      } else {
        // Create a new user only if it does not already exist
        user = new User({
          fullName: req.user.displayName,
          email: req.user.email,
          googleId: req.user.id,
          reasonToJoin: "Google User",
        });
        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });

      // Redirect to frontend
      res.redirect(`${process.env.FRONTEND_URL}`);
    } catch (err) {
      console.error("Error in callback route:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=${err.message}`);
    }
  }
);


router.get("/logout", (req, res) => {
  res.cookie("token", "deleted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    expires: new Date(0),
    maxAge: 0,
    path: "/", 
  });

  res.clearCookie("token", { path: "/" });

  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session?.destroy(() => {
      res.json({ message: "Logout successful" });
    });
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

router.get("/user", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

   res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});


export default router;
