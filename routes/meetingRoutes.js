// meetingSchedulerServer/routes/meeting.routes.js

import express from 'express'
// import {
//   createMeeting,
//   getAllMeetings,
//   updateMeeting,
// } from '../controllers/meeting.controller.js'
import { createMeeting, getAllMeetings } from '../controllers/meetingController.js'
import { updateMeeting } from '../controllers/meetingController.js'
// import { verifyAdmin } from '../middlewares/auth.middleware.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createMeeting)
router.get('/',  getAllMeetings)
router.patch('/:id', updateMeeting)

export default router
