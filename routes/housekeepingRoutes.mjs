import express from 'express';
import {
  getRoomsByStatus,
  scheduleCleaning,
  completeCleaning
} from '../controllers/housekeepingController.mjs';

const router = express.Router();

router.get('/rooms', getRoomsByStatus);
router.post('/schedule', scheduleCleaning);
router.patch('/complete/:roomId', completeCleaning);

export default router;
