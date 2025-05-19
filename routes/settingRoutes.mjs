import express from 'express';
import { updateSetting, getSetting } from '../controllers/settingController.mjs';

const router = express.Router();

router.put('/', updateSetting);        // Update or create setting
router.get('/:key', getSetting);       // Get setting by key

export default router;
