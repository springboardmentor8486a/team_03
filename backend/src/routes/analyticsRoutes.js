import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  getMonthlyReports,
  getReportsByCategory,
  getOverallStats
} from '../controllers/analyticsController.js';

const router = express.Router();

// Protect all routes
router.use(verifyToken);

// Get monthly reports statistics
router.get('/monthly', getMonthlyReports);

// Get reports by category
router.get('/category', getReportsByCategory);

// Get overall statistics
router.get('/overall', getOverallStats);

export { router as analyticsRoutes };