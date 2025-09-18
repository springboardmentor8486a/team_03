// src/controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../utils/mailer.js"; // ✅ centralized transporter

/* ---------------- REGISTER ---------------- */
// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  if (user) {
    try {
      await transporter.sendMail({
        from: `"Clean Street" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Welcome to Clean Street!",
        text: `Hi ${user.name},\n\nThank you for registering with Clean Street. We’re excited to have you on board!`,
      });
    } catch (error) {
      console.error("Error sending welcome email:", error.message);
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/* ---------------- LOGIN ---------------- */
// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/* ---------------- FORGOT PASSWORD ---------------- */
// @desc    Forgot password - send OTP
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // valid for 10 mins
  user.isOtpVerified = false; // reset verification
  await user.save();

  try {
    await transporter.sendMail({
      from: `"Clean Street" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[DEV] OTP for", email, ":", otp);
    return res.json({ message: "OTP sent to registered email", otp });
  }

  res.json({ message: "OTP sent to registered email" });
});

/* ---------------- VERIFY OTP ---------------- */
// @desc    Verify OTP
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.otp) {
    res.status(400);
    throw new Error("No OTP requested for this user");
  }

  // In dev, log stored OTP to help debugging
  if (process.env.NODE_ENV !== "production") {
    console.log("[DEV] Stored OTP:", String(user.otp), "Provided OTP:", String(otp).trim());
  }

  if (user.otpExpiry < Date.now()) {
    res.status(400);
    throw new Error("OTP expired");
  }

  if (String(user.otp) !== String(otp).trim()) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  // Mark OTP as verified and clear OTP so it can't be reused
  user.isOtpVerified = true;
  await user.save();

  res.json({ message: "OTP verified. You can reset your password now." });
});

/* ---------------- RESET PASSWORD ---------------- */
// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isOtpVerified) {
    res.status(400);
    throw new Error("OTP verification required");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Clear OTP fields
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.isOtpVerified = false;

  await user.save();

  res.json({ message: "Password reset successful. You can log in now." });
});

/* ---------------- JWT GENERATOR ---------------- */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/* ---------------- GET USER PROFILE ---------------- */
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -otp -otpExpiry -isOtpVerified");
  
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    address: user.address,
    bio: user.bio,
    role: user.role,
    notifications: user.notifications,
    privacy: user.privacy,
    stats: user.stats,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

/* ---------------- UPDATE USER PROFILE ---------------- */
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  console.log("📝 BEFORE UPDATE - User data:", {
    name: user.name,
    phone: user.phone,
    city: user.city,
    address: user.address,
    bio: user.bio
  });

  // Extract allowed fields from request body
  const {
    name,
    phone,
    city,
    address,
    bio,
    notifications,
    privacy,
  } = req.body;

  console.log("📥 UPDATE REQUEST - Received data:", req.body);

  // Update only provided fields
  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (city !== undefined) user.city = city;
  if (address !== undefined) user.address = address;
  if (bio !== undefined) user.bio = bio;

  // Update notification preferences
  if (notifications) {
    user.notifications = {
      ...user.notifications,
      ...notifications,
    };
  }

  // Update privacy settings
  if (privacy) {
    user.privacy = {
      ...user.privacy,
      ...privacy,
    };
  }

  console.log("📝 BEFORE SAVE - Modified user data:", {
    name: user.name,
    phone: user.phone,
    city: user.city,
    address: user.address,
    bio: user.bio
  });

  const updatedUser = await user.save();

  console.log("✅ AFTER SAVE - Database confirmed save with updatedAt:", updatedUser.updatedAt);
  console.log("💾 FINAL DATABASE DATA:", {
    name: updatedUser.name,
    phone: updatedUser.phone,
    city: updatedUser.city,
    address: updatedUser.address,
    bio: updatedUser.bio
  });

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    city: updatedUser.city,
    address: updatedUser.address,
    bio: updatedUser.bio,
    role: updatedUser.role,
    notifications: updatedUser.notifications,
    privacy: updatedUser.privacy,
    stats: updatedUser.stats,
    updatedAt: updatedUser.updatedAt,
  });
});

export {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getUserProfile,
  updateUserProfile,
};
