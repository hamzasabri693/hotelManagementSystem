import express from 'express';
import { generateBill, getInvoice } from '../controllers/billingController.mjs';

const router = express.Router();

router.post('/generate', generateBill);             // POST /api/billing/generate
router.get('/invoice/:bookingId', getInvoice);      // GET /api/billing/invoice/:bookingId

export default router;
