// meetingSchedulerServer/routes/meeting.routes.js

import express from 'express'
import {
  completeMeeting,
  createMeeting,
  getAllMeetings,
  updateMeeting,
} from '../controllers/meetingController.js'

// Uncomment if you want to protect routes in the future
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Create a new meeting
router.post('/',protect, createMeeting)

// Get all meetings
router.get('/', protect,adminOnly, getAllMeetings)

// Update a meeting and send SMS
router.patch('/:id', protect,adminOnly, updateMeeting)
router.patch('/:id/complete', protect,adminOnly, completeMeeting)

export default router
