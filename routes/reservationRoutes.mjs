import express from 'express';
import {
  checkIn,
  checkOut
} from '../controllers/reservationController.mjs';

const router = express.Router();

router.put('/:id/checkin', checkIn);
router.put('/:id/checkout', checkOut);

export default router;
