// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    console.log("decoded:", decoded); // Added console log
    req.user = decoded; // expects { id: userId }
    console.log("req.user:", req.user); // Added console log
    next();
  } catch (err) {
    console.error("JWT verification error:", err); // Added console log
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
