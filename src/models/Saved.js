import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const SavedSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

SavedSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

export default mongoose.models.Saved ||
  mongoose.model("Saved", SavedSchema);