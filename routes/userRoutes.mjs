import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';
import allowRoles from '../middleware/roleMiddleware.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'You are logged in', user: req.user });
  });

  router.get(
    '/admin-only',
    authMiddleware,
    allowRoles('admin'),
    (req, res) => {
      res.json({ message: 'Welcome admin!', user: req.user });
    }
  );
  
  router.get(
    '/manager-or-admin',
    authMiddleware,
    allowRoles('admin', 'manager'),
    (req, res) => {
      res.json({ message: 'Access granted for admin or manager', user: req.user });
    }
  );

export default router;
