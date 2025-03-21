import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  googleId: { type: String, unique: true, sparse: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  otp: String,
  otpExpires: Date,
  reasonToJoin: {
    type: String,
    required: true,
    enum: ["I need a project", "I want to explore notes", "I want to start learning", "Other", "Google User"],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
