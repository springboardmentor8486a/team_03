import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  getMyComplaints,
  deleteComplaint,
  addComment,
  getComments,
  deleteComment,
  voteComplaint,
  adminGetAllComplaints,
  adminUpdateComplaintStatus
} from "../controllers/complaintController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication to all routes
router.use(verifyToken);

import upload from "../middlewares/uploadMiddleware.js";

// Complaint Routes  
router.route("/")
  .get(getAllComplaints)           // GET /api/complaints
  .post(upload.single("photo"), createComplaint); // POST /api/complaints with photo upload

// IMPORTANT: Specific routes must come BEFORE generic /:id routes
router.get("/my", getMyComplaints);  // GET /api/complaints/my

// Vote route - must come before /:id
router.patch("/:id/vote", voteComplaint); // PATCH /api/complaints/:id/vote

// Admin route - get all complaints (admin only)
router.get("/admin/all", isAdmin, getAllComplaints); // legacy admin route (can use adminGetAllComplaints)
router.get("/admin/list", isAdmin, adminGetAllComplaints);

// Admin route - update complaint status (admin only)
router.put("/admin/:id/status", isAdmin, adminUpdateComplaintStatus);

// Comment Routes - must come before /:id
router.route("/:id/comments")
  .post(addComment)                // POST /api/complaints/:id/comments - Add a comment
  .get(getComments);               // GET /api/complaints/:id/comments - Get all comments

router.delete("/:id/comments/:commentId", deleteComment); // DELETE /api/complaints/:id/comments/:commentId - Delete a comment

// Generic /:id routes must come LAST
router.route("/:id")
  .get(getComplaintById)           // GET /api/complaints/:id
  .put(updateComplaint)            // PUT /api/complaints/:id
  .delete(deleteComplaint);        // DELETE /api/complaints/:id
export { router as complaintRoutes };
