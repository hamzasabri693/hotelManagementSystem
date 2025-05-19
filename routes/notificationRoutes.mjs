import express from 'express';
import {
  createNotification,
  getAllNotifications,
  markNotificationAsRead,
} from '../controllers/notificationController.mjs';

const router = express.Router();

router.post('/', createNotification);              // Create notification
router.get('/', getAllNotifications);              // Get all notifications
router.put('/:id/read', markNotificationAsRead);   // Mark as read

export default router;
