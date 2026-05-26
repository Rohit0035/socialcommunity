import mongoose from "mongoose";

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

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);