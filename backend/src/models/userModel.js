// src/models/userModel.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "volunteer", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
