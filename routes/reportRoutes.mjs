import express from 'express';
import {
  getDashboardReport,
  getBookingAnalytics,
  getPricingAnalytics,
} from '../controllers/reportController.mjs';

const router = express.Router();

router.get('/dashboard', getDashboardReport);
router.get('/bookings', getBookingAnalytics);
router.get('/pricing', getPricingAnalytics);

export default router;
