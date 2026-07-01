import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const RepostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RepostSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

export default mongoose.models.Repost ||
  mongoose.model("Repost", RepostSchema);