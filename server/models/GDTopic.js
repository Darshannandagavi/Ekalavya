import mongoose from "mongoose";

const gdTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "GD topic title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GDDomain",
      required: true,
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

gdTopicSchema.index({
  domain: 1,
});

gdTopicSchema.index({
  createdBy: 1,
});

export default mongoose.model("GDTopic", gdTopicSchema);
