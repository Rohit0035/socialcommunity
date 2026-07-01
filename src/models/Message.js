import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: String,

    media: String,

    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

MessageSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);