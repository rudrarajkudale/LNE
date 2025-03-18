import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
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
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    }
  })
);

setupPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Welcome to the API 🚀"));

app.all("*",(req,res, next) => {
  next(new expressError(404 , "page not found"));
});
app.use((err,req,res,next) => { 
  let {statusCode = 500, message = "Something went wrong"} = err;
  res.status(statusCode).render("listings/error.ejs", {message});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
