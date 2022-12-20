import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, requied: true },
  password: { type: String, requied: true },
  email: { type: String, requied: true, unique: true },
  isAdmin: { type: Boolean, requied: true, default: true },
});

const User = mongoose.model("User", userSchema);

export default User;
