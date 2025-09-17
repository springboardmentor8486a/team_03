// src/utils/mailer.js
import nodemailer from "nodemailer";

// Create a transporter only once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email from .env
    pass: process.env.EMAIL_PASS, // your email password from .env
  },
});

export default transporter;

