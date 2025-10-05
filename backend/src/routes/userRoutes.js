// src/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  testEmail,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/test-email", testEmail);

// Protected routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, upload.single("photo"), updateUserProfile);

export { router as userRoutes };