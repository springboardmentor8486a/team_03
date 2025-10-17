import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  getMyComplaints,
  deleteComplaint,
  voteComplaint
} from "../controllers/complaintController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication to all routes
router.use(verifyToken);

import upload from "../middlewares/uploadMiddleware.js";

// Routes  
router.route("/")
  .get(getAllComplaints)           // GET /api/complaints
  .post(upload.single("photo"), createComplaint); // POST /api/complaints with photo upload

router.get("/my", getMyComplaints);  // GET /api/complaints/my

router.route("/:id")
  .get(getComplaintById)           // GET /api/complaints/:id
  .put(updateComplaint)            // PUT /api/complaints/:id
  .delete(deleteComplaint);        // DELETE /api/complaints/:id


router.patch("/:id/vote", voteComplaint);
export { router as complaintRoutes };
