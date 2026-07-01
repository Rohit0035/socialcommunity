import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const UserSchema = new mongoose.Schema(
  {
    //AUTH
    email: {
      type: String,
      unique: true,
    },
    password: String,
    dateOfBirth: String,
    name: String,
    username: {type:String},
    image: String,

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: String,
      default: "credentials",
    },
    
    //RESET PASSWORD
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongooseDelete, { 
  deletedAt: true, 
  deletedBy: true, 
  overrideMethods: "all" 
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);