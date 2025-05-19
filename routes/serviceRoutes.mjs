import express from 'express';
import {
  requestService,
  getAllServiceRequests,
  updateServiceStatus,
} from '../controllers/serviceController.mjs';

const router = express.Router();

router.post('/', requestService);
router.get('/', getAllServiceRequests);
router.put('/:id/status', updateServiceStatus);

export default router;
