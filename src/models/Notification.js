import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    // WHO RECEIVES NOTIFICATION
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // WHO TRIGGERED NOTIFICATION
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // NOTIFICATION TYPE
    type: {
      type: String,
      enum: [
        "follow",
        "like",
        "comment",
        "mention",
        "message",
        "reel_like",
        "reel_comment",
        "saved",
      ],
      required: true,
    },

    // RELATED POST / REEL
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    // RELATED COMMENT
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // RELATED MESSAGE
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // OPTIONAL TEXT
    text: {
      type: String,
      default: "",
    },

    // READ STATUS
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);