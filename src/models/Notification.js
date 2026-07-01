import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const NotificationSchema = new mongoose.Schema(
  {
    // Receiver
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Triggered by
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Notification category
    type: {
      type: String,
      enum: [
        "follow_request",
        "follow_accepted",
        "follow_rejected",
        "post_like",
        "post_comment",
        "mention",
        "message",
        "saved",
        "story_like",
        "story_mention",
      ],
      required: true,
    },

    // Related resources
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      default: null,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Thumbnail for UI
    previewImage: {
      type: String,
      default: "",
    },

    // Custom message
    text: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    // Example:
    // "liked your reel"
    // "commented: Awesome 🔥"
    actionText: {
      type: String,
      default: "",
    },

    // Read Status
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

NotificationSchema.index({ recipient: 1, isRead: 1 });

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);