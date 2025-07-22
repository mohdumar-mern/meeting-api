import express from 'express';
import {
  adminLogin,
  adminLogout,
  adminRegister
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', adminRegister);  // Admin Registration (Public)
router.post('/login', adminLogin);        // Admin Login (Public)
router.post('/logout', protect, adminLogout); // Secure Logout (Private)

export default router;
