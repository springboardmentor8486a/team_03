import multer from "multer";
import path from "path";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage configuration
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'complaint-images', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 1000, height: 1000, crop: 'limit' }, // Limit max size
      { quality: 'auto', fetch_format: 'auto' } // Optimize quality and format
    ]
  },
});

// Fallback: Local storage (for development/backup)
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = "uploads/";
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log("✅ Created uploads directory");
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Use Cloudinary storage if configured, otherwise fallback to local
const storage = process.env.CLOUDINARY_CLOUD_NAME ? cloudinaryStorage : localStorage;

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

export default upload;
