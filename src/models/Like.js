import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const LikeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

LikeSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

export default mongoose.models.Like ||
  mongoose.model("Like", LikeSchema);