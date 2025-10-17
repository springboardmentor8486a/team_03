// src/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String },
    location: { type: String, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "volunteer", "admin"],
      default: "user",
    },
    // Profile additional fields
    city: { type: String, trim: true },
    address: { type: String, trim: true },
    bio: { type: String, trim: true },
    
    // Notification preferences
    notifications: {
      emailUpdates: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: false },
      pushNotifications: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: true },
    },
    
    // Privacy settings
    privacy: {
      visibility: { 
        type: String, 
        enum: ["Public", "Private", "Friends Only"], 
        default: "Public" 
      },
      showLocation: { type: Boolean, default: true },
      showReports: { type: Boolean, default: true },
      allowContact: { type: Boolean, default: true },
    },
    
    // Stats (can be computed but stored for performance)
    stats: {
      totalReports: { type: Number, default: 0 },
      resolvedReports: { type: Number, default: 0 },
    },
    
    // Authentication fields
    otp: { type: String },      // For password reset OTP
    otpExpiry: { type: Date },  // Expiry time for OTP
    isOtpVerified: { type: Boolean, default: false },
    
  // Profile Information
  city: { type: String, trim: true },
  address: { type: String, trim: true },
  bio: { type: String, trim: true, maxlength: 500 },
  photo: { type: String, default: null },
    
    // Notification Preferences
    notifications: {
      emailUpdates: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: false },
      pushNotifications: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: true }
    },
    
    // Privacy Settings
    privacy: {
      visibility: {
        type: String,
        enum: ["Public", "Private", "Friends Only"],
        default: "Public"
      },
      showLocation: { type: Boolean, default: true },
      showReports: { type: Boolean, default: true },
      allowContact: { type: Boolean, default: true }
    },
    
    // User Statistics
    stats: {
      totalReports: { type: Number, default: 0 },
      resolvedReports: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
