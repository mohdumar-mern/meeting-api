import expressAsyncHandler from "express-async-handler"
import Meeting from "../models/meetingModel.js"
import twilio from 'twilio';

export const createMeeting = expressAsyncHandler( async (req, res) => {
  try {
    console.log(req.body)
    const newMeeting = new Meeting(req.body)
    await newMeeting.save()
    res.status(201).json({ message: 'Meeting scheduled successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error })
  }
})

export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 })
    res.status(200).json(meetings)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch meetings', error })
  }
}

// Update Meeting and Notify User
export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params

    // Validate input
    if (!id) {
      return res.status(400).json({ message: 'Meeting ID is required' })
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' })
    }

    // Twilio Setup
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioPhone) {
      return res.status(500).json({ message: 'Twilio credentials are missing' })
    }

    const client = twilio(accountSid, authToken)

    const { fullName, mobileNumber, arrivalDate, arrivalTime, googleMeetLink } = updatedMeeting

    const location = 'Noida sec200, Sector 63, Noida, Uttar Pradesh, India 201301'
    const message = `Hi ${fullName},\n\nYour meeting details have been updated.\n Location: ${location}\n📅 Date: ${arrivalDate}\n⏰ Time: ${arrivalTime}\n🔗 Google Meet: https://meet.google.com/${googleMeetLink}\n\nBest regards,\nMeeting Organizer`

    // Send SMS
    const result =  await client.messages.create({
      body: message,
      from: twilioPhone,
      to: `+91${mobileNumber}`,
    })

    res.status(200).json({
      message: `Meeting updated and SMS sent to ${fullName} with ${result.sid}`,
  
    })
  } catch (error) {
    console.error('Update meeting error:', error)
    res.status(500).json({
      message: 'Failed to update meeting or send SMS',
      error: error.message,
    })
  }
}
