import express from 'express';
import {

  login,
  logout,
  register
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', register);  // Admin Registration (Public)
router.post('/login', login);        // Admin Login (Public)
router.post('/logout', protect, logout); // Secure Logout (Private)

export default router;
