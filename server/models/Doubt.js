import mongoose from "mongoose";

const doubtSchema = new mongoose.Schema(
  {
    // Student who asked the doubt
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Note on which the doubt was asked
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },

    // Faculty who uploaded the note
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    // Student's question
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      maxlength: 2000,
    },

    // Faculty's clarification
    answer: {
      type: String,
      trim: true,
      default: "",
      maxlength: 5000,
    },

    // Doubt status
    status: {
      type: String,
      enum: ["pending", "answered"],
      default: "pending",
    },

    // Time when faculty answered
    answeredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Doubt = mongoose.model("Doubt", doubtSchema);

export default Doubt;
