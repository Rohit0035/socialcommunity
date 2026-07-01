import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const PostSchema = new mongoose.Schema(
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

    filter: String,

    caption: String,
    location: String,
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    altText: String,
    hideLikeAndViewCount: {
      type: Boolean,
      default: false,
    },
    turnOffCommenting: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema);