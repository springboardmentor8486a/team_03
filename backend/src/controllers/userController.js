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

/* ---------------- GET PROFILE ---------------- */
// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const user = await User.findById(userId).select("-password -otp -otpExpiry -isOtpVerified");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

/* ---------------- UPDATE PROFILE ---------------- */
// @desc    Update current user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const { name, email, phone, location } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // If email is changing, ensure uniqueness
  if (email && email !== user.email) {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      res.status(400);
      throw new Error("Email already in use");
    }
    user.email = email;
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (location !== undefined) user.location = location;

  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    role: user.role,
  });
});

/* ---------------- JWT GENERATOR ---------------- */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile,
};
