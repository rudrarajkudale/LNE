import mongoose from "mongoose";

const teachingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtube: { type: String, required: true },
});

const Teaching = mongoose.model("Teaching", teachingSchema);

export default Teaching;