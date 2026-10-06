import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    jobRole: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },

    package: {
      type: String,
      required: [true, "Package is required"],
      trim: true,
    },

    eligibility: {
      type: String,
      required: [true, "Eligibility is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    driveDate: {
      type: Date,
      required: [true, "Drive date is required"],
    },

    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },

    skills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    applyLink: {
      type: String,
      required: [true, "Application link is required"],
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

placementSchema.index({ driveDate: 1 });
placementSchema.index({ applicationDeadline: 1 });

export default mongoose.model("Placement", placementSchema);
