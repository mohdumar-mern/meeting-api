import expressAsyncHandler from 'express-async-handler';
import Meeting from '../models/meetingModel.js';
import twilio from 'twilio';

// ✅ Create a Meeting
export const createMeeting = expressAsyncHandler(async (req, res) => {
  const {
    fullName,
    mobileNumber,
    state,
    homeDistrict,
    constituency,
    metBefore,
    reference,
    politicalExperience,
    reason,
    occupation,
    janSuraajMember,
    janSuraajWorker,
    electionHistory,
    politicalAffiliation,
    accompanyingPersons,
  } = req.body;


  if (!fullName || !mobileNumber) {
    return res.status(400).json({ message: 'Full name and mobile number are required' });
  }

  // Validate mobile number
  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
  }

  try {
    const newMeeting = new Meeting({
      ...req.body,
      userId: req.user.id,
    });
    await newMeeting.save();

    res.status(201).json({ message: 'Meeting scheduled successfully' });
  } catch (error) {
    console.error('Create Meeting Error:', error);
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
});

// ✅ Get All Meetings
export const getAllMeetings = expressAsyncHandler(async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Get All Meetings Error:', error);
    res.status(500).json({ message: 'Failed to fetch meetings', error: error.message });
  }
});

// ✅ Update Meeting and Notify via SMS (Twilio)
export const updateMeeting = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;


  if (!id) {
    return res.status(400).json({ message: 'Meeting ID is required' });
  }

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    const { fullName } = updatedMeeting;

    // // Twilio Setup
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    // if (!accountSid || !authToken || !twilioPhone) {
    //   return res.status(500).json({ message: 'Twilio credentials are not set in .env' });
    // }

    // const client = twilio(accountSid, authToken);

    // const location = 'Noida sec200, Sector 63, Noida, Uttar Pradesh, India 201301';
    // const smsMessage = `Hi ${fullName},\n\nYour meeting has been updated:\n📍 Location: ${location}\n📅 Date: ${arrivalDate}\n⏰ Time: ${arrivalTime}\n🔗 Google Meet: https://meet.google.com/\n\nRegards,\nJan Suraaj`;

    // const result = await client.messages.create({
    //   body: smsMessage,
    //   from: twilioPhone,
    //   to: `+91${mobileNumber}`,
    // });

    res.status(200).json({
      message: `Meeting updated a successfully to ${fullName}`,
      updatedMeeting,
    });
  } catch (error) {
    console.error('Update Meeting Error:', error);
    res.status(500).json({
      message: 'Failed to update meeting or send SMS',
      error: error.message,
    });
  }
});


/// /completed
export const completeMeeting = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;


  if (!id) {
    return res.status(400).json({ message: 'Meeting ID is required' });
  }

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // ✅ Send success response
    return res.status(200).json({
      message: 'Meeting updated successfully',
      data: updatedMeeting,
    });
  } catch (error) {
    console.error('Update Meeting Error:', error);
    return res.status(500).json({
      message: 'Failed to update meeting',
      error: error.message,
    });
  }
});
