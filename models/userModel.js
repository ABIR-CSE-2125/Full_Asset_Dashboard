import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  super_user: {
    type: Boolean,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
