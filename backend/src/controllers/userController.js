// src/controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Complaint from "../models/complaintModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createTransporter from "../utils/mailer.js"; // ✅ centralized transporter

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

  // Role to 'admin' if email ends with '@cleanstreet.in', otherwise 'user'
  const role = email.endsWith("@cleanstreet.in") ? "admin" : "user";
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  if (user) {
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Clean Street" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Welcome to Clean Street!",
        text: `Hi ${user.name},\n\nThank you for registering with Clean Street. We're excited to have you on board!`,
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
      _id: user._id,
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
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.isOtpVerified = false; // reset verification
  await user.save();

  try {
    const transporter = createTransporter();
    const result = await transporter.sendMail({
      from: `"Clean Street" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
    console.log(`✅ OTP email sent successfully to ${user.email}`, result.messageId);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
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

  if (user.otpExpiry < Date.now()) {
    res.status(400);
    throw new Error("OTP expired");
  }

  if (String(user.otp) !== String(otp).trim()) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  user.isOtpVerified = true;
  await user.save();

  // Generate a JWT token for reset-password URL
  const resetToken = generateToken(user._id);

  res.json({
    message: "OTP verified. You can reset your password now.",
    resetToken,
  });
});

/* ---------------- RESET PASSWORD ---------------- */
// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Invalid or missing token");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(decoded.id);
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

  res.json({ success: true, data: user });
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

  const allowedFields = ["name", "phone", "city", "address", "bio", "notifications", "privacy"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      if (field === "notifications" || field === "privacy") {
        user[field] = { ...user[field].toObject(), ...req.body[field] };
      } else {
        user[field] = req.body[field];
      }
    }
  });

  if (req.file) user.photo = req.file.filename;

  const updatedUser = await user.save();
  const userResponse = updatedUser.toObject();
  delete userResponse.password;
  delete userResponse.otp;
  delete userResponse.otpExpiry;
  delete userResponse.isOtpVerified;

  res.json({ success: true, message: "Profile updated successfully", data: userResponse });
});

/* ---------------- TEST EMAIL ---------------- */
// @desc    Test email configuration
// @route   POST /api/users/test-email
// @access  Public
const testEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    const result = await transporter.sendMail({
      from: `"Clean Street Test" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Test Email from Clean Street",
      text: "This is a test email to verify email configuration is working correctly.",
    });
    res.json({ success: true, message: "Test email sent successfully", messageId: result.messageId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Test email failed", error: error.message });
  }
});

/* ---------------- GET ADMIN USERS ---------------- */
// @desc    Get all users for admin
// @route   GET /api/users/admin/users
// @access  Private/Admin
const getAdminUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password -otp -otpExpiry -isOtpVerified");

    const usersWithComplaintCount = await Promise.all(
      users.map(async (user) => {
        const complaintCount = await Complaint.countDocuments({ reportedBy: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          city: user.city,
          complaintCount,
        };
      })
    );

    res.status(200).json(usersWithComplaintCount);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while fetching users");
  }
});

/* ---------------- JWT GENERATOR ---------------- */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" }); // shorter expiration for reset
};

export {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  testEmail,
  getAdminUsers,
};
