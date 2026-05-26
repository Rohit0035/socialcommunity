import mongoose from "mongoose";

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

LikeSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.models.Like ||
  mongoose.model("Like", LikeSchema);