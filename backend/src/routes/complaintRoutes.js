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
  deleteComment
  voteComplaint
} from "../controllers/complaintController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication to all routes
router.use(verifyToken);

import upload from "../middlewares/uploadMiddleware.js";

// Complaint Routes  
router.route("/")
  .get(getAllComplaints)           // GET /api/complaints
  .post(upload.single("photo"), createComplaint); // POST /api/complaints with photo upload

router.get("/my", getMyComplaints);  // GET /api/complaints/my

router.route("/:id")
  .get(getComplaintById)           // GET /api/complaints/:id
  .put(updateComplaint)            // PUT /api/complaints/:id
  .delete(deleteComplaint);        // DELETE /api/complaints/:id

// Comment Routes
router.route("/:id/comments")
  .post(addComment)                // POST /api/complaints/:id/comments - Add a comment
  .get(getComments);               // GET /api/complaints/:id/comments - Get all comments

router.delete("/:id/comments/:commentId", deleteComment); // DELETE /api/complaints/:id/comments/:commentId - Delete a comment


router.patch("/:id/vote", voteComplaint);
export { router as complaintRoutes };
