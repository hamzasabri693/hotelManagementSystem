import express from 'express';
import {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
  updateRoomStatus
} from '../controllers/roomController.mjs';

import authMiddleware from '../middleware/authMiddleware.mjs';
import allowRoles from '../middleware/roleMiddleware.mjs';

const router = express.Router();

// Only admin or manager can manage rooms
router.post('/',
// authMiddleware, allowRoles('admin', 'manager'),  
addRoom);
router.get('/', 
// authMiddleware, 
getAllRooms);
router.put('/:id',
//  authMiddleware, allowRoles('admin', 'manager'),
  updateRoom);
router.delete('/:id', 
// authMiddleware, allowRoles('admin'), 
deleteRoom);

router.patch('/:id', 
// authMiddleware, allowRoles('admin', 'manager', 'housekeeping'), 
updateRoomStatus);


export default router;
