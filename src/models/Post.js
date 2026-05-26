import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caption: String,

    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video"],
        },
      },
    ],

    location: String,

    hashtags: [String],

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    isReel: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema);