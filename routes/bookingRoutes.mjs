import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';
import allowRoles from '../middleware/roleMiddleware.mjs';

const router = express.Router();

// Staff can book and view bookings
router.post('/', 
// authMiddleware, allowRoles('admin', 'manager', 'receptionist'), 
createBooking);
router.get('/', 
// authMiddleware, allowRoles('admin', 'manager'), 
getBookings);

export default router;
