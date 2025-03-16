import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/db.js";
import setupPassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Passport Middleware
setupPassport(passport);
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

// Database connection
connectDB();

// Start Server
app.get('/',(req,res)=>{
    res.send("welcome")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
