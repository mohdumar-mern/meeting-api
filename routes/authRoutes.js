
import express from 'express'
import { adminLogin, adminLogout, adminRegister } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/logout', protect, adminLogout)
router.post('/register', adminRegister)
router.post('/login', adminLogin)

export default router

