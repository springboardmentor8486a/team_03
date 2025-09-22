// src/utils/mailer.js
import nodemailer from "nodemailer";

let transporter = null;

// Function to create transporter when needed
const createTransporter = () => {
  if (transporter) {
    return transporter;
  }

  // Validate environment variables
  console.log("  Environment Variables Check:");
  console.log("- EMAIL_USER:", process.env.EMAIL_USER ? `✅ ${process.env.EMAIL_USER}` : "❌ NOT SET");
  console.log("- EMAIL_PASS:", process.env.EMAIL_PASS ? `✅ Set (${process.env.EMAIL_PASS.length} chars)` : "❌ NOT SET");
  console.log("- NODE_ENV:", process.env.NODE_ENV || "development");

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email configuration missing!");
    console.error("Please set EMAIL_USER and EMAIL_PASS in your .env file");
    console.error("For Gmail, use an App Password instead of your regular password");
    console.error("Make sure .env file is in the backend directory and has no spaces around =");
    throw new Error("Email configuration missing");
  }

  // Create a transporter only once
  transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email from .env
      pass: process.env.EMAIL_PASS, // your app password from .env
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email transporter verification failed:", error.message);
      console.error("📧 Configuration details:");
      console.error("- EMAIL_USER:", process.env.EMAIL_USER);
      console.error("- EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
      console.error("- EMAIL_PASS format:", process.env.EMAIL_PASS ? (process.env.EMAIL_PASS.includes(' ') ? "❌ Contains spaces" : "✅ No spaces") : "❌ Not set");
      console.error("🔧 Common issues:");
      console.error("1. App Password should be 16 characters without spaces");
      console.error("2. Enable 2-factor authentication on your Gmail account");
      console.error("3. Generate an App Password: https://myaccount.google.com/apppasswords");
      console.error("4. Make sure you're using the App Password, not your regular password");
    } else {
      console.log("✅ Email transporter is ready to send emails");
      console.log("📧 Connected to:", process.env.EMAIL_USER);
    }
  });

  return transporter;
};

// Export a function that returns the transporter
export default createTransporter;

