import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgSrc: { type: String, required: true },
  downloadNotesSrc: { type: String, required: true },
});

const Notes = mongoose.model("Note", noteSchema);

export default Notes;