import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const StorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    media: String,

    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
    storyText: String,
    filter: String,
    audience: String,
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    storyLink: String,
    allowReplies: Boolean,
    allowReactions: Boolean,
    scheduleDate: Date,

    expiresAt: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

StorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: "all"
});

export default mongoose.models.Story ||
  mongoose.model("Story", StorySchema);