import mongoose from "mongoose";

const facultyReviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

// One student can rate each note only once.
// If they rate the same note again, the existing rating is updated.
facultyReviewSchema.index(
  { student: 1, faculty: 1, note: 1 },
  { unique: true },
);

export default mongoose.model("FacultyReview", facultyReviewSchema);
