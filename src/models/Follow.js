import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const FollowSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

FollowSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

FollowSchema.index(
  { follower: 1, following: 1 },
  { unique: true }
);

export default mongoose.models.Follow ||
  mongoose.model("Follow", FollowSchema);