import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db.js";
import { setupPassport } from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
); 

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

setupPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Welcome to the API"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
