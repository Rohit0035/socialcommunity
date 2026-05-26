import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    media: String,

    type: {
      type: String,
      enum: ["image", "video"],
    },

    expiresAt: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Story ||
  mongoose.model("Story", StorySchema);