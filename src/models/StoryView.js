import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const StoryViewSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

StoryViewSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

StoryViewSchema.index(
  { story: 1, viewer: 1 },
  { unique: true }
);

export default mongoose.models.StoryView ||
  mongoose.model("StoryView", StoryViewSchema);