import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },

  totalSemesters: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Course", courseSchema);