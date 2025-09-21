import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  getMyComplaints,
  deleteComplaint
} from "../controllers/complaintController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication to all routes
router.use(verifyToken);

// Routes  
router.route("/")
  .get(getAllComplaints)           // GET /api/complaints
  .post(createComplaint);          // POST /api/complaints

router.get("/my", getMyComplaints);  // GET /api/complaints/my

router.route("/:id")
  .get(getComplaintById)           // GET /api/complaints/:id
  .put(updateComplaint)            // PUT /api/complaints/:id
  .delete(deleteComplaint);        // DELETE /api/complaints/:id

export { router as complaintRoutes };
