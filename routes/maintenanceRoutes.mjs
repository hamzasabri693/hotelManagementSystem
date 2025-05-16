import express from 'express';
import {
  reportIssue,
  resolveIssue,
  getAllIssues
} from '../controllers/maintenanceController.mjs';

const router = express.Router();

router.post('/report', reportIssue);
router.patch('/resolve/:id', resolveIssue);
router.get('/', getAllIssues);

export default router;
