import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";
import dotenv from "dotenv";
import axios from "axios"; // Import axios

dotenv.config(); // Load environment variables

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/contacts", async (req, res) => {
  try {
    // Step 1: Define the backend URL
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    console.log("Using backend URL:", backendUrl);

    // Step 2: Fetch the current logged-in user from the /api/auth/user endpoint
    const userResponse = await axios.get(`${backendUrl}/api/auth/user`, {
      headers: {
        Cookie: req.headers.cookie, // Forward the cookies to maintain the session
      },
      withCredentials: true, // Include credentials (cookies) in the request
    });

    console.log("User response:", userResponse.data);

    if (userResponse.status !== 200) {
      return res.status(401).json({ message: "Unauthorized: Failed to fetch user" });
    }

    const { user } = userResponse.data; // Extract the user data

    // Step 3: Extract form data from the request body
    const { category, ...formData } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Step 4: Create a new contact document
    const contactData = new Contact({
      category,
      [category]: formData,
      userId: user._id, // Associate the contact with the logged-in user
    });
    console.log("Logged-in user:", contactData);
    await contactData.save();

    // Step 5: Prepare email content
    let emailContent = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Category:</strong> ${category}</p>`;

    if (category === "projects") {
      emailContent += `
        <p><strong>Sub-Category:</strong> ${formData.subCategory || "N/A"}</p>
        <h4>Project Details:</h4>
        <p><strong>Requirements:</strong> ${formData.requirements || "N/A"}</p>
        <p><strong>Budget:</strong> ${formData.budget || "N/A"}</p>
        <p><strong>Timeline:</strong> ${formData.timeline || "N/A"}</p>
        <p><strong>Audience:</strong> ${formData.audience || "N/A"}</p>
        <p><strong>Design Preferences:</strong> ${formData.designPreferences?.join(", ") || "N/A"}</p>
        <p><strong>Technical Specs:</strong> ${formData.technicalSpecs || "N/A"}</p>
        <p><strong>Competitor References:</strong> ${formData.competitorReferences || "N/A"}</p>
        <p><strong>Key Contacts:</strong> ${formData.keyContacts || "N/A"}</p>`;
    } else if (category === "notes") {
      emailContent += `
        <p><strong>Note Type:</strong> ${formData.selectedNoteType || "N/A"}</p>
        <p><strong>Subject:</strong> ${formData.subject || "N/A"}</p>
        <p><strong>Requirements:</strong> ${formData.requirements || "N/A"}</p>
        <p><strong>Key Contacts:</strong> ${formData.keyContacts || "N/A"}</p>`;
    } else if (category === "teaching") {
      emailContent += `
        <p><strong>User Type:</strong> ${formData.userType || "N/A"}</p>
        <p><strong>Learning Topic:</strong> ${formData.learningTopic || "N/A"}</p>
        <p><strong>Message:</strong> ${formData.message || "N/A"}</p>
        <p><strong>Contact:</strong> ${formData.contact || "N/A"}</p>`;
    } else if (category === "other") {
      emailContent += `
        <p><strong>Requirements:</strong> ${formData.requirements || "N/A"}</p>
        <p><strong>Key Contacts:</strong> ${formData.keyContacts || "N/A"}</p>`;
    }

    // Step 6: Send email
    await transporter.sendMail({
      from: `"${user.fullName}" <${user.email}>`,
      to: process.env.EMAIL_USER,
      subject: formData.subject || "New Contact Form Submission",
      html: emailContent,
    });

    // Step 7: Send success response
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error in /contacts route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;