// src/utils/imageUtils.js

/**
 * Generates the correct image URL for both local and Cloudinary stored images
 * @param {string} photo - The photo path/filename from database
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (photo) => {
  if (!photo) return null;
  
  // If photo is already a full URL (Cloudinary), return as is
  if (photo.startsWith('http://') || photo.startsWith('https://')) {
    return photo;
  }
  
  // If photo is just a filename (local storage), prepend local server URL
  return `http://localhost:5000/uploads/${photo}`;
};

/**
 * Checks if the image is stored in Cloudinary
 * @param {string} photo - The photo path/filename from database
 * @returns {boolean} - True if stored in Cloudinary
 */
export const isCloudinaryImage = (photo) => {
  if (!photo) return false;
  return photo.includes('cloudinary.com') || photo.startsWith('https://res.cloudinary.com');
};