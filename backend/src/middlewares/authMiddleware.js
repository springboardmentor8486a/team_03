// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

// Generate JWT Token
export const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

//  Verify JWT Token Middleware
export const verifyToken = (req, res, next) => {
  console.log("verifyToken middleware called!"); // Added console log
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  console.log("authHeader:", authHeader); // Added console log
  console.log("token:", token); // Added console log

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    // If token already contains role (new format), use it directly
    if (decoded.role) {
      req.user = decoded;
      console.log("req.user from token:", req.user);
      return next();
    }

    // If token contains only an id (legacy tokens), fetch full user from DB
    const userId = decoded.id || decoded._id || decoded;
    if (!userId) {
      console.log("No userId found in token");
      return res.status(401).json({ message: "Invalid token format" });
    }

    console.log("Fetching user from DB for userId:", userId);
    User.findById(userId)
      .select("_id role email name")
      .then((user) => {
        if (!user) {
          console.log("User not found in DB for id:", userId);
          return res.status(401).json({ message: "User not found" });
        }
        req.user = { id: user._id, role: user.role, email: user.email, name: user.name };
        console.log("req.user from DB:", req.user);
        next();
      })
      .catch((err) => {
        console.error("Error fetching user in verifyToken:", err);
        res.status(500).json({ message: "Server error" });
      });
  } catch (err) {
    console.error("JWT verification error:", err); // Added console log
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Admin role check middleware - use after verifyToken
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    next();
  } catch (err) {
    console.error('isAdmin middleware error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
