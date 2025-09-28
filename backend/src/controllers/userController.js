// src/controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
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

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
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
    console.log(`📧 Attempting to send OTP email to: ${user.email}`);
    console.log(`📧 From: ${process.env.EMAIL_USER}`);
    
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
      `
    });
    
    console.log(`✅ OTP email sent successfully to ${user.email}`);
    console.log(`📧 Message ID: ${result.messageId}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    
    console.error("📧 Email configuration check:");
    console.error("- EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ NOT SET");
    console.error("- EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ NOT SET");
    console.error("📧 Error details:", {
      code: error.code,
      command: error.command,
      response: error.response
    });
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

/* ---------------- GET USER PROFILE ---------------- */
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '-password -otp -otpExpiry -isOtpVerified'
    );

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500);
    throw new Error("Failed to fetch user profile");
  }
});

/* ---------------- UPDATE USER PROFILE ---------------- */
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }


    // Fields that can be updated
    const allowedFields = [
      'name', 'phone', 'city', 'address', 'bio', 
      'notifications', 'privacy'
    ];

    // Update only allowed fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'notifications' || field === 'privacy') {
          // Handle nested objects
          user[field] = { ...user[field].toObject(), ...req.body[field] };
        } else {
          user[field] = req.body[field];
        }
      }
    });

    // Handle photo upload
    if (req.file) {
      user.photo = req.file.filename;
    }

    const updatedUser = await user.save();

    // Remove sensitive fields from response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    delete userResponse.otp;
    delete userResponse.otpExpiry;
    delete userResponse.isOtpVerified;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: userResponse
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500);
    throw new Error("Failed to update user profile");
  }
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

  console.log("🧪 Testing email configuration...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ NOT SET");
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ NOT SET");
  console.log("EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
  console.log("EMAIL_PASS format:", process.env.EMAIL_PASS ? (process.env.EMAIL_PASS.includes(' ') ? "❌ Contains spaces" : "✅ No spaces") : "❌ Not set");

  try {
    // Test transporter connection first
    console.log("🔍 Verifying transporter connection...");
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Transporter verification successful");

    // Send test email
    console.log("📧 Sending test email...");
    const result = await transporter.sendMail({
      from: `"Clean Street Test" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Test Email from Clean Street",
      text: "This is a test email to verify email configuration is working correctly.",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify email configuration is working correctly.</p>
        <p>If you receive this email, your email setup is working! 🎉</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `
    });

    console.log("✅ Test email sent successfully:", result.messageId);
    res.json({ 
      success: true, 
      message: "Test email sent successfully",
      messageId: result.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Test email failed:", error);
    console.error("📧 Full error details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      message: "Test email failed",
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode
      },
      troubleshooting: {
        checkAppPassword: "Make sure you're using a 16-character App Password from Google Account settings",
        check2FA: "Ensure 2-factor authentication is enabled on your Gmail account",
        checkSpaces: "Remove any spaces from your App Password",
        generateNewPassword: "Try generating a new App Password at https://myaccount.google.com/apppasswords"
      }
    });
  }
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
  getUserProfile,
  updateUserProfile,
  testEmail,
};
