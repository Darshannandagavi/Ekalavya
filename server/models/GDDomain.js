import mongoose from "mongoose";

const gdDomainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Domain name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate domain names created by the same faculty
gdDomainSchema.index({ name: 1, createdBy: 1 }, { unique: true });

export default mongoose.model("GDDomain", gdDomainSchema);
