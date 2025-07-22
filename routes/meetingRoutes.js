// meetingSchedulerServer/routes/meeting.routes.js

import express from 'express'
import {
  createMeeting,
  getAllMeetings,
  updateMeeting,
} from '../controllers/meetingController.js'

// Uncomment if you want to protect routes in the future
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Create a new meeting
router.post('/', createMeeting)

// Get all meetings
router.get('/', protect, getAllMeetings)

// Update a meeting and send SMS
router.patch('/:id', protect, updateMeeting)

export default router
