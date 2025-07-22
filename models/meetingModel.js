import mongoose from 'mongoose'

const meetingSchema = new mongoose.Schema(
  {
    fullName: String,
    mobileNumber: String,
    state: String,
    homeDistrict: String,
    constituency: String,
    isScheduled: Boolean,
    metBefore: Boolean,
    reference: String,
    politicalExperience: Boolean,
    reason: String,
    occupation: String,
    janSuraajMember: Boolean,
    janSuraajWorker: Boolean,
    electionHistory: Boolean,
    politicalAffiliation: Boolean,
    willBeAccompanied: Boolean,
    accompanyingPersons: [String],
    priorityTag: String,
    arrivalDate: Date,
    arrivalTime: String,
  },
  { timestamps: true }
)

export default mongoose.model('Meeting', meetingSchema)