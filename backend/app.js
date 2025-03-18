import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import connectFlash from "connect-flash";
import connectDB from "./config/db.js";
import { setupPassport } from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
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
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
    },
  })
);

app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.admin = process.env.ADMIN_ID;
  res.locals.admin_username = process.env.ADMIN_USERNAME;
  res.locals.adminPassword = process.env.ADMIN_PASSWORD;
  next();
});

setupPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Welcome to the API 🚀"));

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
